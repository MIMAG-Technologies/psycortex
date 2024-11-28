const express = require("express");
const {
  createProduct,
  getProduct,
  updateProduct,
} = require("../controllers/productController");

const router = express.Router();

router.post("/", createProduct);
router.get("/:name", getProduct);
router.put("/:id", updateProduct);

module.exports = router;
