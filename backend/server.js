import express from 'express';
import cors from 'cors';
import scrapeReview_kakao from './scrapeReview_kakao.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/review_kakao', scrapeReview_kakao);

app.listen(4000, () => {
  console.log('✅ Backend server running on http://localhost:4000');
});
