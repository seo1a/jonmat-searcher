import { useState } from 'react';

export default function ReviewList() {
  const [query, setQuery] = useState("");
  const [reviews, setReviews] = useState([]);

  const fetchReviewByRestaurantName = async (restaurantName) => {
    const placeIdRes = await fetch(`/api/get-place-id?query=${restaurantName}`);
    const { placeId } = await placeIdRes.json();

    if (!placeId) {
      alert("placeId를 찾을 수 없습니다.");
      return;
    }

    const reviewRes = await fetch(`/api/get-naver-review?placeId=${placeId}`);
    const { reviews } = await reviewRes.json();

    setReviews(reviews); // 화면에 리뷰 보여주기 위해 저장
  };

  return (
    <div>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="장소명 검색"
      />
      <button onClick={() => fetchReviewByRestaurantName(query)}>검색</button>

      {/* 리뷰 렌더링 */}
      <div>
        {reviews.length > 0 ? (
          reviews.map((review, idx) => (
            <div key={idx} style={{ borderBottom: '1px solid #ddd', padding: '10px 0' }}>
              <strong>{review.userName}</strong> ⭐ {review.rating}
              <p>{review.reviewText}</p>
              <small>{review.visitDate}</small>
            </div>
          ))
        ) : (
          <p>리뷰가 없습니다.</p>
        )}
      </div>
    </div>
  );
}
