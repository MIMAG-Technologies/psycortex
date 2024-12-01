const express = require("express");
const {
  fetchUsers,
  getTransactions,
  getContacts,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/adminController");
const upload = require("../utils/multerConfig"); // Import multer setup
const router = express.Router();


router.get("/fetchUsers", fetchUsers);
router.get("/getTransactions/:id", getTransactions);
router.get("/getContacts", getContacts);
router.get("/getProducts/:id", getProducts);
router.delete("/deleteProducts/:id", deleteProduct);
router.post("/createProduct", upload.single("image"), createProduct); // Accept 'image' file
router.post("/updateProduct/:id", upload.single("image"), updateProduct); // Accept 'image' file



module.exports = router;
