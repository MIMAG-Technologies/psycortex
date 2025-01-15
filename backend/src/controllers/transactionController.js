const User = require("../models/User");
const Transaction = require("../models/Transaction");
const { sendEmail } = require("../utils/email");
const crypto = require("crypto");

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
    const { UserData, ProductData, txnId } = req.body;
    
    // Find transaction by ID
    const transactionData = await Transaction.findOne({
      transactionIdentifier: txnId,
    });

    // If transaction already has products, return early
    if (transactionData.products && transactionData.products.length !== 0) {
      res.status(201).json({ success: true, message:"transaction already done",  data: transactionData });
      return;
    }

    // Find or create user
    let user = await User.findOne({ email: transactionData.email });
    if (user) {
      Object.assign(user, UserData);
      await user.save();
    } else {
      user = await User.create(UserData);
    }

    // Assign ProductData to transactionData
    transactionData.products = ProductData;
    await transactionData.save();

    // If transaction is successful, update user's purchase items
    if (transactionData.transactionState === "success") {
      ProductData.forEach((newItem) => {
        // Add new product to purchasesItems
        user.purchasesItems.push({
          productId: newItem.productId,
          quantity: newItem.quantity,
          transactionId: transactionData.transactionIdentifier,
        });
      });

      // Save updated user data
      await user.save();
    }

    res.status(201).json({ success: true, data: transactionData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
    console.log(error);
  }
};


exports.handlePaymets = async (req, res) => {
  try {
      await Transaction.create({
        email: req.body.email,
        amount: req.body.amount,
        transactionState: req.body.status === "success" ? "success" : "error",
        transactionIdentifier: req.body.txnid,
        errorMessage: req.body.error_Message,
      });
    
  } catch (error) {
    console.error("Error while Storing Payment Record:", error);
  }

  res.redirect(
    `${process.env.FRONTEND_URL}/user/order/${btoa(req.body.txnid)}`
  );
};
function generateHash(params, salt) {
  let hashString =
    params["key"] +
    "|" +
    params["txnid"] +
    "|" +
    params["amount"] +
    "|" +
    params["productinfo"] +
    "|" +
    params["firstname"] +
    "|" +
    params["email"] + 
    "|" +
    params["udf1"] +
    "|" +
    params["udf2"] +
    "|" +
    params["udf3"] +
    "|" +
    params["udf4"] +
    "|" +
    params["udf5"] +
    "||||||" +
    salt;
  
  const hash = sha512(hashString);

  return hash;
}

function sha512(str) {
  return crypto.createHash("sha512").update(str).digest("hex");
}
exports.generateHash = async (req, res) => {
  try {
    const { amount, productInfo, firstName, email, phone, surl, furl } =
      req.body;

    const merchantKey = process.env.MERCHANT_KEY;
    const salt = process.env.SALT;
    const txnId = 'TXD'+Date.now();

    const params = {
      key: merchantKey,
      txnid: txnId,
      amount: amount,
      productinfo: productInfo,
      firstname: firstName,
      email: email,
      udf1: "udf1",
      udf2: "udf2",
      udf3: "udf3",
      udf4: "udf4",
      udf5: "udf5",
      phone: phone,
      surl: surl,
      furl: furl,
    };

    const hash = generateHash(params, salt);

    res
      .status(200)
      .json({
        success: true,
        data: hash,
        txnId: txnId,
      });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

