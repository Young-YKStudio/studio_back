const express = require('express');
const router = express.Router();

const { chargeCard, paymentIntent } = require('../controllers/creditCard');

router.route('/charge').post(chargeCard)
router.route('/paymentintent').post(paymentIntent)

module.exports = router;