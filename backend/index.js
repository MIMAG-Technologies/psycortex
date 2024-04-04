const express = require("express");
const app = express();
const cors = require("cors");

const messageRouter = require("./routers/messages");
const emailRouter = require("./routers/email");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://89.116.32.90/",
    credentials: true, // If your API requires credentials (e.g., cookies, authorization headers)
  })
);
require("dotenv").config();

app.use(messageRouter);
app.use(emailRouter);

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

checkDatabaseConnection();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
