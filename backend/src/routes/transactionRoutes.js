const express = require("express");
const {
  makeTransaction,
  sendTransactionEmail,
} = require("../controllers/transactionController");

const router = express.Router();

router.post("/", makeTransaction);
router.post("/sendEmail", sendTransactionEmail);

router.get("/getPaymentGatewayCredentails", (req, res) => {
  const merchantCode = process.env.MERCHANT_CODE;
  const encryptionKey = process.env.ENCRYPTION_KEY;
  const consumerId = process.env.CONSUMER_ID;
  const txnId = process.env.TXN_ID;

  res.status(200).json({
    merchantCode,
    encryptionKey,
    consumerId,
    txnId,
  });
});

module.exports = router;
