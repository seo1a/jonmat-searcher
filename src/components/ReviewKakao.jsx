export default function ReviewKakao({ details, kakaoPlaceId, submittedQuery }) {
    if (!kakaoPlaceId) {
        return (
            <div className="max-w-3xl max-h-[600px] pr-2">
                <p className="font-customBold text-lg">카카오맵 정보를 불러올 수 없습니다.</p>
            </div>
        );
    }

    const restaurantName = submittedQuery || "이 식당";

    return (
        <div className="min-h-[600px] flex items-center justify-center lg:mr-20">
            <div className="max-w-3xl max-h-[600px] pr-2 item-center text-center">
                <div className="font-customBold text-base lg:text-lg mb-4 sm:mb-6">
                    <p>해당 페이지에서 카카오맵 리뷰 제공이 중단 되었습니다.😥</p>
                    <p className="mt-2">
                        {restaurantName}의 카카오맵 리뷰 페이지로 바로 이동해볼까요?
                    </p>
                </div>
                <a
                    href={`https://place.map.kakao.com/${kakaoPlaceId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block font-customBold text-base lg:text-lg px-6 py-3 
                    bg-pink-400 hover:bg-pink-500 border border-black rounded-xl 
                    transition-colors duration-200 text-center"
                >
                    📎 카카오맵 페이지로 이동하기 🚶‍♀️🚶‍♂️
                </a>
            </div>
        </div>
    );
}