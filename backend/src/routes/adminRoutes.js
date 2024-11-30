const express = require('express');
const { fetchUsers, getTransactions, getContacts } = require('../controllers/adminController');
const router = express.Router();

router.get('/fetchUsers',fetchUsers);
router.get('/getTransactions/:id',getTransactions);
router.get("/getContacts", getContacts);

module.exports = router;
