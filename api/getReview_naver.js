import axios from "axios";

export default async function handler(req, res) {
    const { query } = req.query;

    if(!query) {
        return res.status(400).json({ error: 'query is required' });
    }

    try {
        const blogRes = await axios.get(
            `https://openapi.naver.com/v1/search/blog?query=${encodeURIComponent(query)}`,
            {
                headers: {
                    "X-Naver-Client-Id": process.env.NAVER_CLIENT_ID,
                    "X-Naver-Client-Secret": process.env.NAVER_CLIENT_SECRET,
                },
            }
        );

        const imageRes = await axios.get(
            `https://openapi.naver.com/v1/search/image?query=${encodeURIComponent(query)}`,
            {
                headers: {
                  "X-Naver-Client-Id": process.env.NAVER_CLIENT_ID,
                  "X-Naver-Client-Secret": process.env.NAVER_CLIENT_SECRET,
                },
            }
        );

        return res.status(200).json({
            blogItems: blogRes.data.items || [],
            imageItems: imageRes.data.items || [],
        });
    
    } catch (error) {
        console.error("Naver API error: ", error.blogRes?.data || error.message);
        return res.status(500).json({ error: "Failed to fetch blog reviews from Naver" });
    }
}