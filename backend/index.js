const express = require("express");
const app = express();
const cors = require("cors");
const { createAdminIfNotExists } = require("./controllers/adminControllers"); // Import the function

const corsOptions = {
  origin: [
    "http://89.116.32.90",
    "https://89.116.32.90",
    "http://psycortex.in",
    "https://psycortex.in",
  ],
};

app.use(cors(corsOptions));
// app.use(cors());

const messageRouter = require("./routers/messages");
const emailRouter = require("./routers/email");
const userRouter = require("./routers/userRouter");
const productRouter = require("./routers/productRoutes");
const adminRouter = require("./routers/adminRoute");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("dotenv").config();

app.use(messageRouter);
app.use(emailRouter);
app.use(userRouter);
app.use(productRouter);
app.use(adminRouter);

app.get("/", (req, res) => {
  res.status(200).send("Welcome to psycortex Backend!");
});

const PORT = process.env.PORT || 3001;
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function checkDatabaseConnection() {
  try {
    await prisma.$connect();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Failed to connect to database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

async function startServer() {
  // Create admin if it doesn't exist
  await createAdminIfNotExists();

  // Start server after admin creation
  checkDatabaseConnection();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer();
