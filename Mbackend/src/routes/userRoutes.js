const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Product = require("../models/Product");
const Transaction = require("../models/Transaction");
const { getUser } = require("../controllers/authController");

router.get("/getUser", getUser);
router.get("/getUserPurchasedItems", async (req, res) => {
  try {
    // Get the email from the decoded token
    const email = req.user.email;

    // Fetch the user by email
    const user = await User.findOne({ email }).populate(
      "purchasesItems.productId"
    );

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Fetch transactions of the user to get additional details
    const transactions = await Transaction.find({ email });
    // Map purchasesItems to the required format
    const purchasedItems = user.purchasesItems.map((item) => {
      const product = item.productId; // Populated Product
      const transaction = transactions.find(
        (t) => t.transactionId === item.transactionIdentifier
      );
      return {
        id: product._id,
        name: product.name,
        productId: product._id, // Assuming this is what you want as "productId"
        imgsrc: product.imgsrc,
        diffrentby: product.diffrentby,
        sessions: product.sessions,
        cost: product.cost.toLocaleString(), // Add commas for thousands
        description: product.description,
        quantity: item.quantity,
        transactionId: item.transactionId,
        date: transaction ? transaction.dateTime : null,
      };
    });

    res.status(200).json(purchasedItems);
  } catch (error) {
    console.error("Error fetching user purchased items:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

module.exports = router;
