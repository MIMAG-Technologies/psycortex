const express = require("express");
const {
  makeTransaction,
  sendTransactionEmail,
  generateHash,
  handlePaymets,
} = require("../controllers/transactionController");
const router = express.Router();

router.post("/", makeTransaction);
router.post("/sendEmail", sendTransactionEmail);

router.post("/getHash", generateHash);
router.post("/handle_payments", handlePaymets);

module.exports = router;
