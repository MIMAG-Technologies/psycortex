const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  timeframe: String,
  country: String,
  state: String,
  city: String,
  firstname: String,
  lastname: String,
  contactNumber: String,
  email: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Contact", ContactSchema);
