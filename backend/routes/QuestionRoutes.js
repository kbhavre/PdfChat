const express = require('express');
const multer = require('multer');
const { PDFtoQues } = require('../controllers/HuggingFace/Questions');
const router = express.Router();

// Configure file upload
const upload = multer({ dest: 'uploads/' });

// Route to handle PDF upload and question generation
router.post('/uploadFile', upload.single('pdf'), PDFtoQues);

module.exports = router;
