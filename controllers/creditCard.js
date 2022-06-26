const { response } = require('express');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const stripe = require('stripe')(`${process.env.STRIPE_API_SECRET}`)

exports.chargeCard = async (req, res) => {
  // calculate
  const calculateOrderAmount = (order) => {
    return order * 100;
  }

  try {
    let intent;
    if (req.body.payment_method_id) {
      intent = await stripe.paymentIntents.create({
        payment_method: req.body.payment_method_id,
        amount: calculateOrderAmount(req.body.totalAmount),
        currency: 'usd',
        confirmation_method: 'manual',
        confirm: true,
      })
    } else if (req.body.payment_intent_id) {
      intent = await stripe.paymentIntents.confirm(
        req.body.payment_intent_id
      )
    }
    res.send(generateResponse(intent))
  } catch (error) {
    console.log(error)
    return res.send({ error: error.message })
  }
}

const generateResponse = (intent) => {
  if (intent.status === 'requires_action' && intent.next_action.type === 'use_stripe_sdk') {
    return {
      requires_action: true,
      payment_intent_client_secret: intent.client_secret
    }
  } else if (intent.status === 'succeeded') {
    return {
      success: true
    }
  } else {
    return {
      error: 'Invalid PaymentIntent status'
    }
  }
}

exports.paymentIntent = async (req, res) => {
  const { items } = req.body.body;
  const calculateOrderAmount = (items) => {
    return items * 100;
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items[0].amount),
    currency: 'usd',
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
}