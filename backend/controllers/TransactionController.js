const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const Joi = require("joi");
const nodemailer = require("nodemailer");
const JWT_SECRET = process.env.JWT_SECRET;

// Create a new Prisma client instance
const prisma = new PrismaClient();

// Define the validation schema using Joi
const initiateTransactionSchema = Joi.object({
  name: Joi.string().max(255).required(),
  email: Joi.string().email().required(),
  productIds: Joi.array().items(Joi.string().max(255)).required(),
  amount: Joi.string().max(50).required(),
});

const completeTransactionSchema = Joi.object({
  token: Joi.string().required(),
  transactionState: Joi.string().required(),
  transactionIdentifier: Joi.string().required(),
  dateTime: Joi.string().isoDate().required(),
  errorMessage: Joi.string().allow(null, ""),
});

// Create a nodemailer transporter instance
const senderMail = process.env.SENDER_EMAIL;
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: senderMail,
    pass: process.env.EMAIL_PASS, // Make sure you have set your email password in the environment variable
  },
});

const initiateTransaction = async (req, res) => {
  try {
    // Validate the request body
    const { error, value } = initiateTransactionSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { name, email, productIds, amount } = value;

    // Create a new transaction entry with state pending
    const newTransaction = await prisma.transaction.create({
      data: {
        name,
        email,
        productIds: JSON.stringify(productIds), // Store as comma-separated string
        amount,
        transactionState: "pending",
      },
    });

    // Payload to include in the JWT token
    const payload = {
      transactionId: newTransaction.id,
      name,
      email,
      productIds: productIds.join(","), // Store as comma-separated string
      amount,
    };

    // Sign the token
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    // Send the token to the user
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error initiating transaction:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const completeTransaction = async (req, res) => {
  try {
    const Usertoken = req.headers.authorization?.replace("Bearer ", "");

    // If token is not provided, return 401 status code with a message
    if (!Usertoken) {
      return res
        .status(401)
        .json({ message: "Authorization token is required" });
    }

    // Decode the token to extract user email
    const decodedToken = jwt.verify(Usertoken, JWT_SECRET);

    // Validate the request body
    const { error, value } = completeTransactionSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const {
      token,
      transactionState,
      transactionIdentifier,
      dateTime,
      errorMessage,
    } = value;

    // Decode the token to get the payload
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    // Get the transactionId from the decoded token
    let { transactionId, productIds } = decoded;

    // Verify if the transaction details match the existing entry
    const existingTransaction = await prisma.transaction.findUnique({
      where: { id: transactionId },
    });

    if (!existingTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // Update the transaction with the details from the payment gateway
    const updatedTransaction = await prisma.transaction.update({
      where: { id: transactionId },
      data: {
        transactionState: transactionState,
        transactionIdentifier: transactionIdentifier,
        dateTime: new Date(dateTime),
        errorMessage: errorMessage || existingTransaction.errorMessage,
      },
    });

    if (transactionState === "success") {
      try {
        const userEmail = decodedToken.email;

        // Retrieve the user from the database based on the email
        const user = await prisma.user.findUnique({
          where: {
            email: userEmail,
          },
        });

        // If user is not found, handle the error appropriately
        if (!user) {
          throw new Error("User not found");
        }

        // Parse the user's purchasesItems string into an array of objects
        const cart = JSON.parse(user.purchasesItems || "[]");

        // Ensure productIds is a valid JSON array
        if (!Array.isArray(productIds)) {
          productIds = `[${productIds}]`;
        }
        const userPurchased = JSON.parse(productIds);

        // Map through the purchased items and push new items to the cart
        userPurchased.forEach((item) => {
          const newItem = {
            productId: item.productId,
            quantity: item.quantity,
            transactionId: transactionIdentifier,
            date: new Date().toISOString(),
          };
          cart.push(newItem);
        });

        // Update the user's cart and purchases in the database
        await prisma.user.update({
          where: {
            email: userEmail,
          },
          data: {
            cart: "[]", // Clear the cart
            purchasesItems: JSON.stringify(cart), // Update purchases
          },
        });

        // Send a confirmation email to the user
        const mailOptions = {
          from: senderMail,
          to: userEmail,
          subject: "Purchase Confirmation",
          text: `Dear ${user.name},

Thank you for your purchase. Your transaction was successful.

Transaction ID: ${transactionIdentifier}
Amount: ${existingTransaction.amount}

We hope you enjoy your products.

Best regards,
Psycortex Pvt. Ltd.`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error("Error sending email:", error);
          }
          console.log("Email sent:", info.response);
        });
      } catch (error) {
        console.error("Error updating transaction:", error);
        // Handle error, e.g., send response or log
      }
    }

    // Send the updated transaction details to the user
    res.status(200).json({ updatedTransaction });
  } catch (error) {
    console.error("Error completing transaction:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { initiateTransaction, completeTransaction };
