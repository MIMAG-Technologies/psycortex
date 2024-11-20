const User = require("../models/User");
const {
  generateOTP,
  hashOTP,
  generateToken,
  verifyToken,
} = require("../utils/auth");
const { sendEmail } = require("../utils/email");

exports.login = async (req, res) => {
  try {
    const { email } = req.body;
    const otp = generateOTP();
    const hashedOTP = hashOTP(otp);

    await sendEmail(email, "Login OTP", `Your OTP is: ${otp}`);

    res.status(200).json({ success: true, hashedOTP });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.checkOTP = async (req, res) => {
  try {
    const { email, otp, hashedOTP } = req.body;

    if (hashOTP(otp) !== hashedOTP) {
      return res.status(400).json({ success: false, error: "Invalid OTP" });
    }

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email });
    }

    const token = generateToken(email);
    res.status(200).json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = verifyToken(token);

    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
