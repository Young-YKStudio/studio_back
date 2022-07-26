const express = require('express');
const router = express.Router();

const { registerInquiry, getAllInquiry, getNewInquiry } = require('../controllers/inquiry');

router.route('/register').post(registerInquiry);
router.route('/allinquiry').get(getAllInquiry);
router.route('/newinquiry').get(getNewInquiry);

module.exports = router;