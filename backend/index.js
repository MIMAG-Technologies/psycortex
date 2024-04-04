const express = require("express");
const app = express();
const cors = require("cors");

const messageRouter = require("./routers/messages");
const emailRouter = require("./routers/email");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
require("dotenv").config();

app.use(messageRouter);
app.use(emailRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
