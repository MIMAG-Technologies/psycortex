// Import required modules
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");
const { PrismaClient } = require("@prisma/client");

// Create a new Prisma client instance
const prisma = new PrismaClient();
const senderMail = process.env.SENDER_EMAIL;
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: senderMail,
    pass: process.env.EMAIL_PASS, // Make sure you have set your email password in the environment variable
  },
});

const requestSignin = async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: "User does exist" });
    }

    const otp = otpGenerator.generate(6, {
      upperCase: true,
      specialChars: false,
    });

    await prisma.otps.upsert({
      where: { email },
      create: {
        email,
        otp,
        DateTime: new Date().toISOString(),
      },
      update: {
        otp,
        DateTime: new Date().toISOString(),
      },
    });

    const mailOptions = {
      from: senderMail,
      to: email,
      subject: "OTP for Signin",
      text: `Dear User,

Your OTP for signin is: ${otp}

Best regards,
Psycortex Pvt. Ltd.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res
          .status(500)
          .json({ message: "Failed to send OTP. Please try again later." });
      }
      console.log("Email sent:", info.response);
      return res.status(200).json({ message: "OTP sent to your email" });
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const forgotpassword = async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = otpGenerator.generate(6, {
      upperCase: true,
      specialChars: false,
    });

    await prisma.otps.upsert({
      where: { email },
      create: {
        email,
        otp,
        DateTime: new Date().toISOString(),
      },
      update: {
        otp,
        DateTime: new Date().toISOString(),
      },
    });

    const mailOptions = {
      from: senderMail,
      to: email,
      subject: "OTP to Change Password",
      text: `Dear User,

Your OTP to change password is: ${otp}

Best regards,
Psycortex Pvt. Ltd.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res
          .status(500)
          .json({ message: "Failed to send OTP. Please try again later." });
      }
      console.log("Email sent:", info.response);
      return res.status(200).json({ message: "OTP sent to your email" });
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const changepassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: {
        email,
      },
      data: {
        password: hashedNewPassword,
      },
    });

    const mailOptions = {
      from: senderMail,
      to: email,
      subject: "Password Update Successful",
      text: `Dear User,

We are pleased to inform you that your password has been successfully updated.

Thank you for choosing Psycortex Pvt. Ltd..

Best regards,
Psycortex Pvt. Ltd.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      }
      console.log("Email sent:", info.response);
    });

    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const checkOTP = async (req, res) => {
  try {
    const { otp, email, datetime } = req.body;

    // Retrieve the OTP record from the database
    const otpRecord = await prisma.otps.findUnique({
      where: {
        email,
      },
    });

    if (!otpRecord) {
      return res.status(400).json({ message: "Incorrect OTP" }); // No OTP record found
    }

    // Check if the provided OTP matches the stored OTP
    if (otp !== otpRecord.otp) {
      return res.status(400).json({ message: "Incorrect OTP" }); // OTP does not match
    }

    // Check if the OTP is expired (more than 30 minutes old)
    const currentTime = new Date();
    const otpTime = new Date(datetime);
    const timeDifference = Math.abs(currentTime - otpTime) / (1000 * 60); // Difference in minutes

    if (timeDifference > 30) {
      return res.status(400).json({ message: "OTP expired" }); // OTP is expired
    }

    // Delete the OTP record from the database
    await prisma.otps.delete({
      where: {
        email,
      },
    });

    return res.status(200).json({ message: "OTP verified successfully" }); // OTP is valid
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const signin = async (req, res) => {
  try {
    const { email, name, address, password, phoneNo } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user to the database
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        address,
        password: hashedPassword,
        phoneNo,
        cart: "[]",
        purchasesItems: "[]",
      },
    });

    // Generate a token
    const token = jwt.sign({ email: newUser.email }, process.env.JWT_SECRET);

    const mailOptions = {
      from: senderMail,
      to: email,
      subject: "Account Creation Successful",
      text: `Dear ${name},

We are pleased to inform you that your account has been successfully created. You can now start enjoying our services.

Thank you for choosing our platform.

Best regards,
Psycortex Pvt. Ltd.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res
          .status(201)
          .json({ message: "User created successfully", token });
      }
      console.log("Email sent:", info.response);
      return res
        .status(201)
        .json({ message: "User created successfully", token });
    });

    // Send the token and message in the response
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user with the provided email exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // If user does not exist, return user not found message
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the provided password matches the stored hashed password
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    // If password is invalid, return invalid credentials message
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a token
    const token = jwt.sign(
      { email: existingUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" } // Set expiration time to 7 days
    );

    // Send the token in the response
    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  changepassword,
  requestSignin,
  signin,
  login,
  checkOTP,
  forgotpassword,
};
