const mongoose = require('mongoose');

const PdfSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Pdf', PdfSchema);
