import axios from 'axios';

export default async function handler(req, res) {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'query parameter is required' });
  }

  try {
    // 1. place ID 요청
    const searchRes = await axios.get(
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json`,
      {
        params: {
          input: query,
          inputtype: 'textquery',
          fields: 'place_id,name',
          key: process.env.GOOGLE_MAPS_API_KEY,
        },
      }
    );

    const candidate = searchRes.data.candidates[0];
    if (!candidate || !candidate.place_id) {
      return res.status(404).json({ error: "Place ID not found" });
    }

    const placeId = candidate.place_id;
    const name = candidate.name;

    // 2. 리뷰/이미지 요청
    const reviewRes = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json`,
      {
        params: {
            place_id: placeId,
            fields: 'rating,reviews,photos,url',
            key: process.env.GOOGLE_MAPS_API_KEY,
            language: 'ko',
        },
      }
    );

    const reviewResult = reviewRes.data.result;

    const photoUrl = (reviewResult.photos || []).slice(0, 15).map((photo) => ({
      url: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${process.env.GOOGLE_MAPS_API_KEY}`,
    }));

    res.status(200).json({
      name: name,
      rating: reviewResult.rating,
      reviews: reviewResult.reviews || [],
      photos: photoUrl,
      url: reviewResult.url,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch place ID' });
  }
}
