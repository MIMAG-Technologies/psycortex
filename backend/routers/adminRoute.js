const express = require("express");
const router = express.Router();
const {
  adminLogin,
  adminChangePassword,
  checkadmin,
  fetchUserList,
} = require("../controllers/adminControllers");

const adminauth = require("../middleware/adminauth");

router.post("/admin/login", adminLogin);
router.get("/fetchadmin", adminauth, checkadmin);
router.put("/admin/passwordChange", adminauth, adminChangePassword);

// ADMIN USER ROUTES
router.get("/admin/fetchAllUsers/:email", adminauth, fetchUserList);

module.exports = router;
