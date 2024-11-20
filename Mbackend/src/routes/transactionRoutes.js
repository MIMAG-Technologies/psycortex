const express = require("express");
const { makeTransaction } = require("../controllers/transactionController");

const router = express.Router();

router.post("/", makeTransaction);

module.exports = router;
