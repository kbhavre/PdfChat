const express = require('express');
const { test } = require('../controllers/OpenAI/test');
const router = express.Router();

router.post('/test', test);

module.exports = router;
