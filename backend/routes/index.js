const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const db = require('../config/db');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.json({page: 'index'});
});

module.exports = router;