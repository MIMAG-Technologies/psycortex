const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  transactionId: String,
  email: String,
  amount: Number,
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: Number,
    },
  ],
  transactionState: {
    type: String,
    enum: ["error", "success"],
  },
  transactionIdentifier: String,
  dateTime: {
    type: Date,
    default: Date.now,
  },
  errorMessage: String,
});

module.exports = mongoose.model("Transaction", TransactionSchema);
