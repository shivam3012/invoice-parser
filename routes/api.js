const express = require('express');
const router = express.Router();
const userStory = require('../controllers/userStory');

router.get('/parseInvoiceNumbers', function (req, res) {
	userStory.parseInvoiceNumbers(req, res);
});

module.exports = router;