const Subscription = require("../models/Subscription");
const { sendEmail } = require("../utils/email");

exports.subscribe = async (req, res) => {
  try {
    const subscription = await Subscription.create(req.body);

    await sendEmail(
      subscription.email,
      "Subscription Confirmation",
      "Thank you for subscribing to our newsletter!"
    );

    res.status(201).json({ success: true, data: subscription });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find();
    res.status(200).json({ success: true, data: subscriptions });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
