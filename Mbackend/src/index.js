const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const contactRoutes = require("./routes/contactRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const { protect } = require("./middleware/auth");

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
app.use("/user", protect, authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
