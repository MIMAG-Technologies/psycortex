const express = require("express");
const router = express.Router();
const {
  getAllproduct,
  getUserCart,
  addProductToCart,
  updateCart,
} = require("../controllers/productsController");
const auth = require("../middleware/auth");

router.get("/getproducts", getAllproduct);
router.put("/additemtocart", auth, addProductToCart);
router.put("/updatecart", auth, updateCart);
router.get("/getUserCart", auth, getUserCart);

module.exports = router;
