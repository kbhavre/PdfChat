const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: "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"
});

// Handle PDF Upload and Text Extraction
exports.extractTextFromPDF = async (req, res) => {
  try {
    // Assuming the text is extracted from the PDF here
    const extractedText = 'Sample extracted text from PDF';

    res.status(200).json({ extractedText });
  } catch (error) {
    res.status(500).json({ error: 'Error extracting text from PDF' });
  }
};





// Handle Question and Answer with OpenAI
exports.getAnswer = async (req, res) => {
  try {
    const { question, extractedText } = req.body;

    const response = await openai.completions.create({
      model: 'text-davinci-003',
      prompt: `${extractedText}\n\nQuestion: ${question}\nAnswer:`,
      max_tokens: 100,
    });

    const answer = response.choices[0].text.trim();
    res.status(200).json({ answer });
  } catch (error) {
    console.error('Error with OpenAI API:', error);
    res.status(500).json({ error: 'Error processing request with OpenAI' });
  }
};
