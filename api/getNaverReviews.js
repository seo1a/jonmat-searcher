export default async function handler(req, res) {
    const { placeId } = req.query;
  
    if (!placeId) {
      return res.status(400).json({ error: 'placeId가 필요합니다.' });
    }
  
    try {
      const response = await fetch(`https://apis.naver.com/place_api/visitor/1/stream/${placeId}`, {
        headers: {
          'Referer': `https://pcmap.place.naver.com/restaurant/${placeId}/review/visitor`,
          'User-Agent': 'Mozilla/5.0',
          'Accept': 'application/json',
        },
      });
  
      if (!response.ok) {
        return res.status(response.status).json({ error: '리뷰를 가져오지 못했습니다.' });
      }
  
      const data = await response.json();
  
      // 필요한 데이터만 추출
      const reviews = data.result?.visitorReviews?.map((review) => ({
        userName: review.userName,
        rating: review.rating,
        reviewText: review.reviewText,
        visitDate: review.visitDate,
      })) || [];
  
      res.status(200).json({ reviews });
    } catch (err) {
      res.status(500).json({ error: '서버 에러', detail: err.message });
    }
  }