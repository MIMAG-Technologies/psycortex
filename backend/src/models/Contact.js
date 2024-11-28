const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  contactNumber: String,
  city: String,
  state: String,
  country: String,
  message: String,
  timeframe: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Contact", ContactSchema);
