const Inquiry = require('../models/Inquiry');

exports.registerInquiry = async (req, res) => {
  const { fullname, email, phoneNumber, message, inquiry, budget, businessName, portfolio } = req.body.body.data

  if (!fullname || !email || !phoneNumber || !message || !inquiry) {
    res.status(400).json({ success: false, error: 'provide all required information'})
  }

  try {
    const contact = await Inquiry.create({
      fullname,
      email,
      phoneNumber,
      inquiry,
      budget,
      businessName,
      portfolio,
      message
    })
    res.status(200).json({ success: true, data: contact })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, error: 'error found at registering'})
  }
}

exports.getAllInquiry = async (req, res) => {
  try {
    const allInquiry = await Inquiry.find({});
    res.status(200).json({ success: true, data: allInquiry })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, error: 'error getting data'})
  }
}

exports.getNewInquiry = async (req, res) => {
  try{
    const newInquiry = await Inquiry.find({inConfirmed: true});
    res.status(200).json({ success: true, data: newInquiry});
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'error getting data'})
  }
}