const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./src/config/db");
const contactRoutes = require("./src/routes/contactRoutes");
const subscriptionRoutes = require("./src/routes/subscriptionRoutes");
const transactionRoutes = require("./src/routes/transactionRoutes");
const authRoutes = require("./src/routes/authRoutes");
const productRoutes = require("./src/routes/productRoutes");
const userRoutes = require("./src/routes/userRoutes");
const { protect } = require("./src/middleware/auth");

dotenv.config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use("/contactUs", contactRoutes);
app.use("/subscribe", subscriptionRoutes);
app.use("/make-transaction", transactionRoutes);
app.use("/auth", authRoutes);
app.use("/product", productRoutes);

// Protected routes
app.use("/user", protect, userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
