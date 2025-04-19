import axios from 'axios';

export default async function handler(req, res) {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'query parameter is required' });
  }

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json`,
      {
        params: {
          input: query,
          inputtype: 'textquery',
          fields: 'place_id,name,formatted_address',
          key: process.env.GOOGLE_MAPS_API_KEY,
        },
      }
    );

    const place = response.data.candidates[0];

    if (!place) {
      return res.status(404).json({ error: 'Place not found' });
    }

    res.status(200).json({
      placeId: place.place_id,
      name: place.name,
      address: place.formatted_address,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch place ID' });
  }
}
