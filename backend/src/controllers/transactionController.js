const User = require("../models/User");
const Transaction = require("../models/Transaction");
const { sendEmail } = require("../utils/email");
// const crypto = require("crypto");

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
    const { UserData, txnId } = req.body;
    console.log(
      "[makeTransaction] Received request with UserData and txnId:",
      UserData,
      txnId
    );

    // Find transaction by ID
    console.log("[makeTransaction] Looking for transaction with ID:", txnId);
    const transactionData = await Transaction.findOne({
      transactionIdentifier: txnId,
    });

    if (!transactionData) {
      console.error("[makeTransaction] No transaction found for ID:", txnId);
      return res
        .status(404)
        .json({ success: false, message: "Transaction not found" });
    }

    // If transaction already has products, return early
    if (transactionData.products && transactionData.products.length !== 0) {
      console.log(
        "[makeTransaction] Transaction already has products, skipping update."
      );
      res.status(201).json({
        success: true,
        message: "transaction already done",
        data: transactionData,
      });
      return;
    }

    // Find or create user
    console.log(
      "[makeTransaction] Looking for user with email:",
      transactionData.email
    );
    let user = await User.findOne({ email: transactionData.email });
    if (user) {
      console.log("[makeTransaction] User found, updating user details.");
      user.address = UserData.address;
      user.name = UserData.name;
      user.email = UserData.email;
      user.phoneNo = UserData.phoneNo;
      user.companyName = UserData.companyName;
      user.country = UserData.country;
      user.streetAddress = UserData.streetAddress;
      await user.save();
      console.log("[makeTransaction] User details updated and saved.");
    } else {
      console.log("[makeTransaction] User not found, creating new user.");
      user = await User.create({
        address: UserData.address,
        name: UserData.name,
        email: UserData.email,
        phoneNo: UserData.phoneNo,
        companyName: UserData.companyName,
        country: UserData.country,
        streetAddress: UserData.streetAddress,
      });
      console.log("[makeTransaction] New user created.");
    }

    // Assign ProductData to transactionData
    console.log("[makeTransaction] Assigning products to transaction.");
    transactionData.products = UserData.purchasesItems.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    }));
    await transactionData.save();
    console.log("[makeTransaction] Transaction products updated and saved.");

    // If transaction is successful, update user's purchase items
    if (transactionData.transactionState === "success") {
      console.log(
        "[makeTransaction] Transaction state is success, updating user's purchasesItems."
      );
      UserData.purchasesItems.forEach((newItem) => {
        // Add new product to purchasesItems
        user.purchasesItems.push({
          productId: newItem.productId,
          quantity: newItem.quantity,
          transactionId: transactionData.transactionIdentifier,
        });
        console.log(
          `[makeTransaction] Added productId ${newItem.productId} to user's purchasesItems.`
        );
      });

      // Save updated user data
      await user.save();
      console.log("[makeTransaction] User's purchasesItems updated and saved.");
    } else {
      console.log(
        "[makeTransaction] Transaction state is not success, skipping purchasesItems update."
      );
    }

    console.log("[makeTransaction] Returning success response.");
    console.log(transactionData);
    res.status(201).json({ success: true, data: transactionData });
  } catch (error) {
    console.error("[makeTransaction] Error occurred:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.handlePaymets = async (req, res) => {
  const { email, amount, status, txnid } = req.params;
  console.log(email, amount, status, txnid);
  try {
    await Transaction.create({
      email: email,
      amount: amount,
      transactionState: status === "success" ? "success" : "error",
      transactionIdentifier: txnid,
      errorMessage: status === "success" ? "" : "Payment Failed",
    });
  } catch (error) {
    console.error("Error while Storing Payment Record:", error);
  }
  const frontendUrl =
    process.env.DEV_MODE === "true"
      ? "http://localhost:3000"
      : "https://psycortex.in";

  res.redirect(`${frontendUrl}/user/order/${btoa(txnid)}`);
};

// function generateHash(params, salt) {
//   let hashString =
//     params["key"] +
//     "|" +
//     params["txnid"] +
//     "|" +
//     params["amount"] +
//     "|" +
//     params["productinfo"] +
//     "|" +
//     params["firstname"] +
//     "|" +
//     params["email"] +
//     "|" +
//     params["udf1"] +
//     "|" +
//     params["udf2"] +
//     "|" +
//     params["udf3"] +
//     "|" +
//     params["udf4"] +
//     "|" +
//     params["udf5"] +
//     "||||||" +
//     salt;

//   const hash = sha512(hashString);

//   return hash;
// }

// function sha512(str) {
//   return crypto.createHash("sha512").update(str).digest("hex");
// }
exports.generateHash = async (req, res) => {
  try {
    // const { amount, productInfo, firstName, email, phone, surl, furl } =
    //   req.body;

    // const merchantKey = process.env.MERCHANT_KEY;
    // const salt = process.env.SALT;
    const txnId = "TXN" + Date.now() + Math.floor(10 + Math.random() * 90);

    // const params = {
    //   key: merchantKey,
    //   txnid: txnId,
    //   amount: amount,
    //   productinfo: productInfo,
    //   firstname: firstName,
    //   email: email,
    //   udf1: "udf1",
    //   udf2: "udf2",
    //   udf3: "udf3",
    //   udf4: "udf4",
    //   udf5: "udf5",
    //   phone: phone,
    //   surl: surl,
    //   furl: furl,
    // };

    // const hash = generateHash(params, salt);

    res.status(200).json({
      success: true,
      // data: hash,
      txnId: txnId,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
