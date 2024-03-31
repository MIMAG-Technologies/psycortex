const express = require("express");
const router = express.Router();
const {
  receiveBooking,
  receiveMessage,
} = require("../controllers/messageControllers");

router.post("/messages/contactus", receiveMessage);
router.post("/messages/booking", receiveBooking);

module.exports = router;
