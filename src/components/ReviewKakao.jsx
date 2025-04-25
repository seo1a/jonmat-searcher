function formatPostDate(dateStr) {
    if (!dateStr || dateStr.length !== 11) return dateStr;
    return `${dateStr.slice(0, 4)}-${dateStr.slice(5, 7)}-${dateStr.slice(8,10)}`;
}

function ReviewMessage({ message, kakaoPlaceId }) {
    return (
        <div className="max-w-3xl max-h-[600px] pr-2">
            <p className="font-customBold text-lg mb-3">{message}</p>
            <a
                href={`https://place.map.kakao.com/${kakaoPlaceId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-customRegular text-base hover:underline"
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
                <div className="max-w-3xl max-h-[600px] overflow-y-scroll">
                    <h3 className="font-customBold text-base lg:text-lg mt-2">카카오맵 리뷰 평점: ⭐️ {totalRating}</h3>
                    <a
                        href={`https://place.map.kakao.com/${kakaoPlaceId}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="font-customRegular text-sm lg:text-base hover:underline"
                    >
                        📎 카카오맵 페이지로 이동하기 🚶‍♀️🚶‍♂️
                    </a>

                    <ul className="mt-6 space-y-3">
                        {reviews.map((review, i) => (  
                            <li key={i} className="py-4 font-noto_sans border border-black rounded-xl
                            bg-gradient-to-b from-white via-violet-100 to-violet-200">
                                <p className="font-bold text-base lg:text-lg mx-3 lg:mx-6">{review.name || '작성자 없음'} - ⭐ {review.rating ?? 'N/A'}</p>
                                <p className="text-sm lg:text-base text-gray-900 mt-1 mx-3 lg:mx-6">{review.contents}</p>
                                <p className="text-gray-500 text-xs mt-1 mx-3 lg:mx-6">
                                    🕒 {formatPostDate(review.date)}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}