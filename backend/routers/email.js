const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.post("/subscription", async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the email already exists
    const existingSubscription = await prisma.subscriptions.findUnique({
      where: {
        email: email,
      },
    });

    // If email already exists, return a message
    if (existingSubscription) {
      return res
        .status(400)
        .json({ message: "Email already exists in subscriptions" });
    }

    // If email does not exist, add it to subscriptions
    const newSubscription = await prisma.subscriptions.create({
      data: {
        email,
      },
    });

    res.status(201).json({
      message: "Subscription Added successfully",
      subscription: newSubscription,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
