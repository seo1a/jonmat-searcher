export default async function handler(req, res) {
    const { query } = req.query;
  
    if (!query) {
      return res.status(400).json({ error: '식당명을 입력하세요.' });
    }
  
    const apiKey = process.env.NAVER_CLIENT_ID;
    const apiSecret = process.env.NAVER_CLIENT_SECRET;
  
    try {
      const response = await fetch(`https://openapi.naver.com/v1/search/local.json?query=${encodeURIComponent(query)}&display=1`, {
        headers: {
          'X-Naver-Client-Id': apiKey,
          'X-Naver-Client-Secret': apiSecret,
        },
      });
  
      const data = await response.json();
      if (data.items && data.items.length > 0) {
        // 예시로 title, link, category, address 등 들어 있음
        const link = data.items[0].link;
        const placeIdMatch = link.match(/place\/(\d+)/);
        const placeId = placeIdMatch ? placeIdMatch[1] : null;
  
        if (placeId) {
          return res.status(200).json({ placeId });
        } else {
          return res.status(404).json({ error: 'placeId를 찾을 수 없습니다.' });
        }
      } else {
        return res.status(404).json({ error: '검색 결과가 없습니다.' });
      }
    } catch (err) {
      return res.status(500).json({ error: '서버 에러', detail: err.message });
    }
  }