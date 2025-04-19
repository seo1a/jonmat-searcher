import express from 'express';
import cors from 'cors';
import getPlaceId_naver from './getPlaceId_naver.js';
import scrapeReview_naver from './scrapeReview_naver.js';
import getReviewByQuery_naver from './getReviewByQuery_naver.js';
import scrapeReview_kakao from './scrapeReview_kakao.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/placeId_naver', getPlaceId_naver);
app.post('/api/review_naver', scrapeReview_naver);
app.post('/api/searchReview_naver', getReviewByQuery_naver);

app.post('/api/review_kakao', scrapeReview_kakao);

app.listen(4000, () => {
  console.log('✅ Backend server running on http://localhost:4000');
});
