const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const pdfRoutes = require('./routes/pdfRoutes');
const questionRoutes = require('./routes/QuestionRoutes');
const testRoutes = require('./routes/test');
const { errorHandler } = require('./middlewares/errorMiddleware');

dotenv.config();
connectDB();



app.use(express.json()); 

app.use('/api/pdf', pdfRoutes); 
app.use('/api/pdf', questionRoutes); 
app.use('/api/gpt', testRoutes); 

app.use(errorHandler); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
