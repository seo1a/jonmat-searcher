export default function ReviewGoogle({ details }) {
    return(
        <div>
            {details && (
                <div className="max-w-3xl max-h-[520px] overflow-y-scroll pr-2">
                    <h3 className="font-customBold text-lg mt-2">구글 플레이스 평점: ⭐️ {details.rating}</h3>
                    <a
                        href={details.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="font-customRegular text-md hover:underline"
                    >
                        📎 구글 플레이스 페이지로 이동하기 🚶‍♀️🚶‍♂️
                    </a>

                    <ul className="mt-6 space-y-3">
                        {details.reviews.map((review, i) => (  
                            <li key={i} className="border-b py-4">
                                <strong className="font-customRegular text-lg">{review.author_name} - ⭐ {review.rating}</strong>
                                <p className="font-customRegular text-md mt-1">{review.text}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}