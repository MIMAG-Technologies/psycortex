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
router.get("/handle_payments/:email/:amount/:status/:txnid", handlePaymets);

module.exports = router;
