// Import required modules
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const JWT_SECRET = process.env.JWT_SECRET;

// Create a new Prisma client instance
const prisma = new PrismaClient();

// Function to fetch user information based on JWT token
const fetchUser = async (req, res) => {
  try {
    // Extract token from the request headers
    const token = req.headers.authorization?.replace("Bearer ", "");

    // If token is not provided, return 401 status code with a message
    if (!token) {
      return res
        .status(401)
        .json({ message: "Authorization token is required" });
    }

    // Decode the token to extract user email
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const userEmail = decodedToken.email;

    // Fetch user information from the database based on the decoded email
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phoneNo: true,
        address: true,
        cart: true,
        purchasesItems: true,
        companyName: true,
        country: true,
        streetAddress: true,
        apartment: true,
        city: true,
        state: true,
        pinCode: true,
      },
    });

    // If user is not found, return 404 status code with a message
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Parse the cart and purchasesItems strings into arrays
    const cartArray = JSON.parse(user.cart || "[]");
    const purchasesItemsArray = JSON.parse(user.purchasesItems || "[]");

    // Send user information in the response with cart and purchasesItems as arrays
    return res.status(200).json({
      user: { ...user, cart: cartArray, purchasesItems: purchasesItemsArray },
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Function to update user information based on JWT token
const updateUser = async (req, res) => {
  try {
    // Extract token from the request headers
    const token = req.headers.authorization?.replace("Bearer ", "");

    // If token is not provided, return 401 status code with a message
    if (!token) {
      return res
        .status(401)
        .json({ message: "Authorization token is required" });
    }

    // Decode the token to extract user email
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const userEmail = decodedToken.email;

    // Extract updated user data from the request body
    const updatedUserData = req.body;

    // Update user information in the database based on the decoded email
    const updatedUser = await prisma.user.update({
      where: {
        email: userEmail,
      },
      data: {
        ...updatedUserData,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phoneNo: true,
        address: true,
        cart: true,
        purchasesItems: true,
        companyName: true,
        country: true,
        streetAddress: true,
        apartment: true,
        city: true,
        state: true,
        pinCode: true,
      },
    });

    // Parse the cart and purchasesItems strings into arrays
    const cartArray = JSON.parse(updatedUser.cart || "[]");
    const purchasesItemsArray = JSON.parse(updatedUser.purchasesItems || "[]");

    // Send updated user information in the response with cart and purchasesItems as arrays
    return res.status(200).json({
      user: {
        ...updatedUser,
        cart: cartArray,
        purchasesItems: purchasesItemsArray,
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Export the functions
module.exports = { fetchUser, updateUser };
