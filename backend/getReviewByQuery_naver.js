import getPlaceId_naver from './getPlaceId_naver.js';
import scrapeReview_naver from './scrapeReview_naver.js';

export default async function getReviewByQuery_naver(req, res) {
  const query = req.body.query;
  if (!query) return res.status(400).json({ error: 'Query is required' });

  // 1. 먼저 placeId 얻기
  const placeIdRes = {
    status: () => ({ json: () => {} }),
    json: () => {},
  };
  let placeId;
  try {
    await getPlaceId_naver(
      { body: { query } },
      {
        status: (code) => ({
          json: (result) => {
            if (code === 200) placeId = result.placeId;
          },
        }),
      }
    );
  } catch (e) {
    return res.status(500).json({ error: 'Failed to get placeId' });
  }

  if (!placeId) {
    return res.status(404).json({ error: 'PlaceId not found' });
  }

  // 2. placeId로 리뷰 가져오기
  try {
    await scrapeReview_naver(
      { body: { placeId } },
      res // 이건 그냥 res 넘기면 됨
    );
  } catch (e) {
    return res.status(500).json({ error: 'Failed to get review' });
  }
}
