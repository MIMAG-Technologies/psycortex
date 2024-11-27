const User = require("../models/User");
const Transaction = require("../models/Transaction");
const { sendEmail } = require("../utils/email");

exports.sendTransactionEmail = async (req, res) => {
  try {
    const { email, htmlContent } = req.body; // Expecting email, adminEmail, and htmlContent in the request body

    if (!email || !htmlContent) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const userHTML = `
        <h3>Dear Customer,</h3>
        <p>Thank you for your purchase. Please find your transaction details below:</p>
        ${htmlContent} <!-- Inject the HTML content for the invoice -->
        <p>For any issues, please contact us at info@psycortex.in.</p>
        <p>Best regards,<br>Psycortex Pvt. Limited</p>
      `;
    const Admin_HTML = `
        <h3>Dear Admin,</h3>
        <p>A new transaction has been completed. Below are the details:</p>
        ${htmlContent} <!-- Inject the HTML content for the invoice -->
        <p>Regards,<br>Psycortex Pvt. Limited</p>
      `;

    // Send both emails
    await sendEmail(
      email,
      "Transaction Successful - Invoice Attached",
      userHTML
    );
    await sendEmail(
      process.env.ADMIN_EMAIL,
      "New Transaction Alert",
      Admin_HTML
    );

    res.status(200).json({ message: "Emails sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send emails.", error });
  }
};

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

      // Check if the items already exist before adding them
      newPurchases.forEach((newItem) => {
        const itemExists = user.purchasesItems.some(
          (existingItem) => existingItem.productId === newItem.productId
        );
        if (!itemExists) {
          user.purchasesItems.push(newItem);
        } else {
          // Optionally, update the quantity if the product already exists
          user.purchasesItems = user.purchasesItems.map((existingItem) => {
            if (existingItem.productId === newItem.productId) {
              existingItem.quantity += newItem.quantity; // Add quantity if product exists
            }
            return existingItem;
          });
        }
      });

      await user.save();
    }

    res.status(201).json({ success: true, data: transaction });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
    console.log(error);
  }
};
