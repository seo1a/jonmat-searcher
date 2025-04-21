import axios from 'axios';

export default async function handler(req, res) {
    const { placeId } = req.query;

    if (!placeId) {
        return res.status(400).json({ error: 'placeId parameter is required' });
    }

    try {
    const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json`,
        {
        params: {
            place_id: placeId,
            fields: 'name,rating,reviews,photos,url',
            key: process.env.GOOGLE_MAPS_API_KEY,
            language: 'ko',
        },
        }
    );

    const result = response.data.result;

    // photo URL 만들기
    const photoUrl = result.photos?.map(photo => ({
        url: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo.photo_reference}&key=${process.env.GOOGLE_MAPS_API_KEY}`,
    })) || [];

    res.status(200).json({
        name: result.name,
        rating: result.rating,
        reviews: result.reviews || [],
        photos: photoUrl,
        url: result.url,
    });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch place details' });
    }
}
