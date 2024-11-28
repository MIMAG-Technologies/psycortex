const express = require("express");
const {
  login,
  checkOTP,
  getUser,
  googleLogin,
} = require("../controllers/authController");

const router = express.Router();

router.post("/login", login);
router.post("/checkOTP", checkOTP);
router.post("/googleLogin", googleLogin);

module.exports = router;
