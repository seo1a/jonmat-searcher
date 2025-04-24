function ReviewMessage({ message, kakaoPlaceId }) {
    return (
        <div className="max-w-3xl max-h-[600px] pr-2">
            <p className="font-customBold text-lg mb-3">{message}</p>
            <a
                href={`https://place.map.kakao.com/${kakaoPlaceId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-customRegular text-md hover:underline"
            >
                📎 카카오맵 페이지로 이동하기 🚶‍♀️🚶‍♂️
            </a>
        </div>
    );
}

export default function ReviewKakao({ details, kakaoPlaceId }) {
    const reviews = details?.reviews || [];
    const totalRating = details?.totalRating ?? 0;
    const status = details?.status;

    if (status === 'no_review_provided') {
        return <ReviewMessage message="이 가게는 후기가 제공되지 않아요.🥺" kakaoPlaceId={kakaoPlaceId} />;
    }

    if (status === 'no_reviews') {
        return <ReviewMessage message="아직 작성된 후기가 없어요.🥺" kakaoPlaceId={kakaoPlaceId} />;
    }
    
    return(
        <div>
            {reviews && (
                <div className="max-w-3xl max-h-[600px] overflow-y-scroll pr-2">
                    <h3 className="font-customBold text-lg mt-2">카카오맵 리뷰 평점: ⭐️ {totalRating}</h3>
                    <a
                        href={`https://place.map.kakao.com/${kakaoPlaceId}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="font-customRegular text-md hover:underline"
                    >
                        📎 카카오맵 페이지로 이동하기 🚶‍♀️🚶‍♂️
                    </a>

                    <ul className="mt-6 space-y-3">
                        {reviews.map((review, i) => (  
                            <li key={i} className="border-b py-4">
                                <strong className="font-customRegular text-lg">{review.name || '작성자 없음'} - ⭐ {review.rating ?? 'N/A'}</strong>
                                <p className="font-customRegular text-md mt-1">{review.contents}</p>
                                <p className="font-customRegular text-gray-500 text-xs mt-1">
                                    🕒{review.date}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}