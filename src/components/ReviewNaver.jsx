export default function ReviewNaver({ blogPosts, images }) {
    function formatPostDate(dateStr) {
        if (!dateStr || dateStr.length !== 8) return dateStr;
        return `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6)}`;
    }
    
    return(
        <div>
            {blogPosts.length > 0 && (
                <div className="mt-8">
                    <h3 className="text-lg font-semibold">🔍 관련 블로그 포스트</h3>
                    <ul className="mt-2 space-y-3">
                        {blogPosts.map((post, index) => (
                            <li key={index} className="border p-3 rounded shadow">
                                <a href={post.link} target="_blank" rel="noopener noreferrer" className="text-blue-700 font-bold hover:underline">
                                    <span dangerouslySetInnerHTML={{ __html: post.title }} />
                                </a>
                                <p className="text-sm mt-1" dangerouslySetInnerHTML={{ __html: post.description }} />
                                <p className="text-gray-500 text-xs mt-1">🕒 {formatPostDate(post.postdate)}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {images && (
                <div className="flex flex-wrap gap-2 mt-4">
                    {images.map((image, i) => (
                        <div key={i} className="flex">
                            <img 
                                src={image.link} 
                                alt={`photo-${i}`} 
                                className="w-24 h-auto" 
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}