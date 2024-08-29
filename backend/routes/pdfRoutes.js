const express = require('express');
const { extractTextFromPDF, getAnswer } = require('../controllers/pdfController');

const router = express.Router();

router.post('/upload', extractTextFromPDF);
router.post('/ask', getAnswer);

module.exports = router;
