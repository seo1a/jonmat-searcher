export default function ReviewGoogle({ details }) {
    return(
        <div>
            {details && (
                <div className="max-w-3xl max-h-[700px] lg:max-h-[600px] 
                mx-3 lg:mx-0 overflow-y-scroll pr-2">
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
                            <li key={i} className="py-4 font-noto_sans border border-black rounded-xl
                            bg-gradient-to-b from-white via-violet-100 to-violet-200">
                                <p className="font-bold text-base lg:text-lg px-4 lg:px-6">{review.author_name} - ⭐ {review.rating}</p>
                                <p className="text-sm lg:text-base text-gray-900 mt-1 px-4 lg:px-6">{review.text}</p>
                                <p className="text-gray-500 text-xs mt-1 px-4 lg:px-6">
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