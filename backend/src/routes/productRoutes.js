const express = require("express");
const {
  getProduct,
} = require("../controllers/productController");

const router = express.Router();


router.get("/:name", getProduct);



module.exports = router;
