const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const db = require('../config/db');
const tokenVerifier = require('../middleware/verifyToken');

/* GET home page. */
router.get('/', tokenVerifier, function(req, res, next) {
    res.json({tokenData: req.tokenData})
});

module.exports = router;