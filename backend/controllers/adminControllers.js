const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

async function createAdminIfNotExists() {
  // Check if there is any admin in the database
  const existingAdmin = await prisma.admin.findFirst();

  // If no admin exists, create one
  if (!existingAdmin) {
    const password = await bcrypt.hash("admin#123", 10); // Hash the password with bcrypt

    await prisma.admin.create({
      data: {
        username: "admin", // You can set your desired default username here
        password: password, // Store the hashed password in the database
      },
    });
    console.log("Admin created successfully.");
  } else {
    console.log("Admin already exists.");
  }
}

const adminLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find admin by username
    const admin = await prisma.admin.findUnique({
      where: { username },
    });

    // If admin not found or password doesn't match, return error
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { username: admin.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d", // Token expires in 1 hour
      }
    );

    // Return token to client
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error during admin login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const adminChangePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const username = req.username;

  try {
    // Find admin by username
    const admin = await prisma.admin.findUnique({
      where: { username },
    });

    // If admin not found or old password doesn't match, return error
    if (!admin || !(await bcrypt.compare(oldPassword, admin.password))) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update admin's password in the database
    await prisma.admin.update({
      where: { username },
      data: { password: hashedNewPassword },
    });

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error during admin password change:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const checkadmin = async (req, res) => {
  // Extract the username from the response object provided by middleware
  const username = req.username;

  try {
    // Query the database to check if an admin with the given username exists
    const admin = await prisma.admin.findUnique({
      where: { username },
    });

    // If admin exists, return success response
    if (admin) {
      return res.status(200).json({ exists: true });
    } else {
      // If admin doesn't exist, return error response
      return res.status(404).json({ exists: false });
    }
  } catch (error) {
    console.error("Error checking admin:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const fetchUserList = async (req, res) => {
  const email = req.params.email;

  try {
    let user;

    if (email === "all") {
      user = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          phoneNo: true,
          address: true,
          cart: true,
          purchasesItems: true,
        },
      });
    } else {
      user = await prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
          name: true,
          email: true,
          phoneNo: true,
          address: true,
          cart: true,
          purchasesItems: true,
        },
      });
    }

    // If user is not found, return 404 status code with a message
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user list:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  adminLogin,
  adminChangePassword,
  createAdminIfNotExists,
  checkadmin,
  fetchUserList,
};
