import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post('/api/pdf/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    setExtractedText(response.data.extractedText);
  };

  const handleAsk = async () => {
    const response = await axios.post('/api/pdf/ask', { question, extractedText });
    setAnswer(response.data.answer);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-6 text-indigo-600">PDF Chat Application</h1>

      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100 mb-4"
        />
        <button
          onClick={handleUpload}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300"
        >
          Upload PDF
        </button>

        {extractedText && (
          <div className="mt-6">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask a question based on the PDF"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleAsk}
              className="w-full mt-4 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300"
            >
              Ask
            </button>
            <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="text-gray-800"><strong>Answer:</strong> {answer}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
