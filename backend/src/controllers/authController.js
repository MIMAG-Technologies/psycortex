const User = require("../models/User");
const {
  generateOTP,
  hashOTP,
  generateToken,
  verifyToken,
} = require("../utils/auth");
const { decrypt } = require("../utils/cryptoUtils");
const { sendEmail } = require("../utils/email");

exports.googleLogin = async (req, res) => {
  try {
    const DECRYPTION_KEY = process.env.DECRYPTION_KEY; // Fetch key from .env
    const {encryptedData} = req.body;
      const decryptedData = decrypt(encryptedData, DECRYPTION_KEY);
      const { name, email } = JSON.parse(decryptedData);
    if (!email || !name) {
      return res.status(400).json({ success: false, error: "Invalid request" });
    }

    // Check if the user exists in the database
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        email,
        name,
        phoneNo: "",
        companyName: "",
        purchasesItems: [],
        address: {
          country: "",
          streetAddress: "",
          apartment: "",
          city: "",
          state: "",
          pinCode: "",
        },
      });
    }

    // Generate a JWT for the user
    const token = generateToken(email);

    res.status(200).json({ success: true, token });
  } catch (error) {
    console.log(error);

    res.status(500).json({ success: false, error: "Invalid or expired token" });
  }
};

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
      user = await User.create({
        name: "",
        email,
        phoneNo: "",
        companyName: "",
        purchasesItems: [],
        address: {
          country: "",
          streetAddress: "",
          apartment: "",
          city: "",
          state: "",
          pinCode: "",
        },
      });
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
