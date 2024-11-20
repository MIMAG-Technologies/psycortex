const express = require("express");
const { login, checkOTP, getUser } = require("../controllers/authController");

const router = express.Router();

router.post("/login", login);
router.post("/checkOTP", checkOTP);
router.get("/getUser", getUser);

module.exports = router;
