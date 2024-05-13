// Import required modules
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

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
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
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
      },
    });

    // If user is not found, return 404 status code with a message
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Parse the cart string into an array
    const cartArray = JSON.parse(user.cart || "[]");

    // Send user information in the response with cart as an array
    return res.status(200).json({ user: { ...user, cart: cartArray } });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Export the fetchUser function
module.exports = { fetchUser };
