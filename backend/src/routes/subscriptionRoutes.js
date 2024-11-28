const express = require("express");
const {
  subscribe,
  getSubscriptions,
} = require("../controllers/subscriptionController");

const router = express.Router();

router.post("/", subscribe);
router.get("/", getSubscriptions);

module.exports = router;
