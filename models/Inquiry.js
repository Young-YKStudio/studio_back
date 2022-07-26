const mongoose = require('mongoose');

const InquirySchema = new mongoose.Schema({
  fullname: String,
  email: String,
  phoneNumber: String,
  inquiry: String,
  budget: String,
  businessName: String,
  portfolio: String,
  message: String,
  isConfirmed: {
    type: Boolean,
    default: false,
  }
}, {timestamps: true})

const Inquiry = mongoose.model("Inquiry", InquirySchema);
module.exports = Inquiry;