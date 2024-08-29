import { useState } from 'react';

function App() {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/pdf/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error uploading PDF');
      }

      const data = await response.json();
      setExtractedText(data.extractedText);
    } catch (error) {
      console.error('Error uploading PDF:', error);
    }
  };

  const handleAsk = async () => {
    try {
      const response = await fetch('/api/pdf/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
          extractedText,
        }),
      });

      if (!response.ok) {
        throw new Error('Error asking question');
      }

      const data = await response.json();
      setAnswer(data.answer);
    } catch (error) {
      console.error('Error asking question:', error);
    }
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
