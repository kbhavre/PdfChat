
const fs = require('fs');
const pdf = require('pdf-parse');
const axios = require('axios');
const { summarizeText } = require('./huggingController');
const apiKey = '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';

// Function to extract text from PDF
const extractTextFromPDF = async (filePath) => {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdf(dataBuffer);
  return data.text; 
};

// Function to generate questions using Hugging Face with Chunks
const generateQuestions = async (text) => {
    try {
      const maxLength = 512; // Token limit for the model
      const chunkSize = maxLength - 10; // Allow some buffer for model processing
      const chunks = [];
  
      // Split text into chunks
      for (let i = 0; i < text.length; i += chunkSize) {
        chunks.push(text.slice(i, i + chunkSize));
      }
  
      // Generate questions for each chunk
      const questions = [];
      for (const chunk of chunks) {
        const response = await axios.post(
          'https://api-inference.huggingface.co/models/valhalla/t5-small-qg-hl',
          {
            inputs: chunk,
          },
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
          }
        );
  
        // Combine questions from each chunk
        questions.push(...response.data);
      }
  
      return questions;
    } catch (err) {
      console.error('Error details:', err.response ? err.response.data : err.message);
      throw new Error('Error generating questions from Hugging Face API');
    }
  };
  

// Controller function to handle PDF upload and question generation
exports.PDFtoQues = async (req, res) => {
  try {
    const filePath = req?.file?.path;
    console.log("FILE : ", req?.file);  

    const extractedText = await extractTextFromPDF(filePath); 
    console.log("Text from PDF : ", extractedText);
    
    const questions = await generateQuestions(extractedText);  
    
    res.status(200).json({
        success: true,
        questions : questions,
    }
    ); 

  } catch (err) {
    console.error('Error processing PDF:', err);
    res.status(500).json({ error: 'Failed to generate questions from PDF' });
  }
};
