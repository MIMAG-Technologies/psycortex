const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNo: String,
  companyName: String,
  purchasesItems: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: Number,
      transactionId: String,
    },
  ],
  address: {
    country: String,
    streetAddress: String,
    apartment: String,
    city: String,
    state: String,
    pinCode: String,
  },
});

module.exports = mongoose.model("User", UserSchema);
