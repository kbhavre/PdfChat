const axios = require('axios');

// Hugging Face API key
const apiKey = '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';

// Summarization controller
exports.summarizeText = async (req, res) => {
  try {
    const { text } = req.body;  // Extract the text you want to summarize from the request body

    // Call Hugging Face API
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',  // You can use other models too
      {
        inputs: text,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Get the summarization output
    const summary = response.data[0].summary_text;
    
    // Send the summary back to the client
    res.status(200).json({ summary });
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Error processing summarization request' });
  }
};








































