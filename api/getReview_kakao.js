import axios from 'axios';

export default async function handler(req, res) {
    const { placeId } = req.query;

    if (!placeId) {
        return res.status(400).json({ error: 'placeId parameter is required' });
    }

    try {
        const reviewRes = await axios.get(
            `https://place.map.kakao.com/commentlist/v/${placeId}`,
            {
                headers: {
                    "User-Agent": "Mozilla/5.0"
                },
            }
        );

        const imageRes = await axios.get(
            `https://place.map.kakao.com/photolist/v/${placeId}`,
            {
                headers: {
                    "User-Agent": "Mozilla/5.0"
                },
            }
        );
        
        const reviewResult = reviewRes.data;
        const imageResult = imageRes.data;

        // ✅ 이미지 리스트 추출 (항상 시도)
        let imageList = [];
        if (typeof imageResult === 'object' && imageResult.photoViewer?.list){
            imageList = imageResult.photoViewer.list
                .slice(0, 30)
                .map((image) => ({
                    link: image.url
                }));
        }

        // 케이스 1. 후기 미제공
        if (!reviewResult.comment) {
            return res.status(200).json({
                status: 'no_review_provided',
                totalRating: 0,
                reviews: [],
                images: imageList  
            });
        }

        const scoreSum = reviewResult.comment.scoresum || 0;
        const scoreCnt = reviewResult.comment.scorecnt || 0;

        const totalRating = scoreCnt === 0 
            ? 0 
            : Math.round((scoreSum / scoreCnt) * 10) / 10;

        // 후기 리스트 가져오기
        let reviewList = [];
        if (typeof reviewResult === 'object' && reviewResult.comment?.list){
            reviewList = reviewResult.comment.list.map((review) => ({
                name: review.username, 
                contents: review.contents || [], 
                date: review.date, 
                rating: review.point, 
            }));
        }

        // 케이스 2. 후기 0개
        if (reviewList.length === 0) {
            return res.status(200).json({
                status: 'no_reviews',
                totalRating,
                reviews: [],
                images: imageList  
            });
        }

        // 케이스 3. 정상 케이스
        return res.status(200).json({
            status: 'success',
            totalRating,      
            reviews: reviewList,
            images: imageList
        });

    } catch (error) {
        console.error('❌ Error scraping Kakao reviews:', error);
        return res.status(500).json({ error: 'Failed to fetch reviews' });
    }
}
