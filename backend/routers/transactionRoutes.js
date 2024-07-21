const express = require("express");

const router = express.Router();
const auth = require("../middleware/auth");

const TransactionController = require("../controllers/TransactionController");

router.post(
  "/transaction/initiate",
  auth,
  TransactionController.initiateTransaction
);
router.post(
  "/transaction/complete",
  auth,
  TransactionController.completeTransaction
);

router.get("/getPaymentGatewayCredentails", auth, (req, res) => {
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
