export default function ReviewGoogle({ details }) {
    return(
        <div>
            {details && (
                <div className="max-w-3xl max-h-[700px] lg:max-h-[600px] 
                mx-4 lg:mx-0 overflow-y-scroll pr-2">
                    <h3 className="font-customBold text-base lg:text-lg mt-2">구글 플레이스 평점: ⭐️ {details.rating}</h3>
                    <a
                        href={details.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="font-customRegular text-sm lg:text-base hover:underline"
                    >
                        📎 구글 플레이스 페이지로 이동하기 🚶‍♀️🚶‍♂️
                    </a>

                    <ul className="mt-6 space-y-3">
                        {details.reviews.map((review, i) => (  
                            <li key={i} className="font-noto_sans border-b py-4">
                                <p className="font-bold text-base lg:text-lg">{review.author_name} - ⭐ {review.rating}</p>
                                <p className="text-sm lg:text-base mt-1 text-gray-900">{review.text}</p>
                                <p className="text-gray-500 text-xs mt-1">
                                    🕒 {review.relative_time_description}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}