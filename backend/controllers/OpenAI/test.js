const { OpenAI } = require("openai");
require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.OOPENAI_API_KEY
});

exports.test = async (req, res) => {
    try {
        const { prompt } = req.body;
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 512,
            temperature: 0,
        });

        const answer = response?.choices[0]?.message?.content.trim();
        res.status(200).json({ answer });
    } catch (error) {
        console.error('Error with OpenAI API:', error);
        res.status(500).json({ error: error.response ? error.response.data : 'Error processing request' });
    }
};
