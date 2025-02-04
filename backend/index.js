const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const connectDB = require("./src/config/db");
const contactRoutes = require("./src/routes/contactRoutes");
const subscriptionRoutes = require("./src/routes/subscriptionRoutes");
const transactionRoutes = require("./src/routes/transactionRoutes");
const authRoutes = require("./src/routes/authRoutes");
const productRoutes = require("./src/routes/productRoutes");
const adminRoutes = require("./src/routes/adminRoutes");

const userRoutes = require("./src/routes/userRoutes");
const { protect, isAdmin } = require("./src/middleware/auth");

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
app.get("/uploads/productThumbnail/:filename", (req, res) => {
  const filename = req.params.filename;
  const filepath = path.join(
    __dirname,
    "./src/uploads/productThumbnail",
    filename
  );

  res.sendFile(filepath, (err) => {
    if (err) {
      res.status(404).json({ success: false, error: "Image not found" });
    }
  });
});

// Protected routes
app.use("/user", protect, userRoutes);

// Admin routes
app.use("/admin", adminRoutes);
app.get("/test", async(req,res)=>{
  res.status(200).json({"message":"Welcome to Psycortex Api"})
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
