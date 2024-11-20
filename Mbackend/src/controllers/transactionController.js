const User = require("../models/User");
const Transaction = require("../models/Transaction");

exports.makeTransaction = async (req, res) => {
  try {
    const { UserData, ProductData, transactionData } = req.body;

    // Find or create user
    let user = await User.findOne({ email: UserData.email });
    if (user) {
      Object.assign(user, UserData);
      await user.save();
    } else {
      user = await User.create(UserData);
    }

    // Create transaction
    const transaction = await Transaction.create({
      email: UserData.email,
      products: ProductData,
      ...transactionData,
    });

    // Update user's purchasesItems if transaction successful
    if (transactionData.transactionState === "success") {
      const newPurchases = ProductData.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        transactionId: transactionData.transactionIdentifier,
      }));

      user.purchasesItems.push(...newPurchases);
      await user.save();
    }

    res.status(201).json({ success: true, data: transaction });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
