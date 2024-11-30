const express = require("express");
const {
  login,
  checkOTP,
  getUser,
  googleLogin,
  adminLogin
} = require("../controllers/authController");

const router = express.Router();

router.post("/login", login);
router.post("/checkOTP", checkOTP);
router.post("/googleLogin", googleLogin);
router.post("/adminlogin", adminLogin);

module.exports = router;
