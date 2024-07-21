const express = require("express");
const router = express.Router();
const {
  requestSignin,
  signin,
  login,
  checkOTP,
  forgotpassword,
  changepassword,
} = require("../controllers/authController");
const { fetchUser, updateUser } = require("../controllers/UserController");

// AUTH ROUTES

router.post("/auth/requestsignin", requestSignin);
router.post("/auth/forgotpassword", forgotpassword);
router.put("/auth/changepassword", changepassword);
router.post("/auth/checkotp", checkOTP);
router.post("/auth/signin", signin);

router.post("/auth/login", login);

// USE ROUTES

router.get("/user/fetchuser", fetchUser);
router.put("/user/updateuser", updateUser);

module.exports = router;
