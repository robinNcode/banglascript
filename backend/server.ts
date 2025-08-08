import express from 'express';
import cors from 'cors';
import connectDB from './utils/db.js';
import { submitFeedback } from './controllers/feedbackController.js';
import { getVisitorCount, setVisitorCount } from './controllers/visitorController.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

app.get('/', (req, res) => {
  res.send('BanglaScript API is running');
});

// Endpoint to submit feedback
app.post('/api/feedback', submitFeedback);

// Endpoint to get visitor count
app.get('/api/visitor-count', getVisitorCount);

// Endpoint to set visitor count (for admin use)
app.post('/api/visitor', setVisitorCount);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
