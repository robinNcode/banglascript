
import express from 'express';
import cors from 'cors';
import connectDB from './utils/db';
import { submitFeedback } from './controllers/feedbackController';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

app.post('/api/feedback', submitFeedback);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
