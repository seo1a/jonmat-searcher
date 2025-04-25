export default function ReviewNaver({ details }) {
    function formatPostDate(dateStr) {
        if (!dateStr || dateStr.length !== 8) return dateStr;
        return `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6)}`;
    }
    
    if (!details || !details.blog) return null;

    return(
        <div>
            {details.blog.length > 0 && (
                <div className="max-w-3xl max-h-[700px] lg:max-h-[600px] 
                mx-4 lg:mx-0 overflow-y-scroll pr-2">
                    <ul className="space-y-3">
                        {details.blog.map((post, i) => (
                            <li key={i} className="font-noto_sans border-b py-4">
                                <a 
                                    href={post.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="font-bold text-base lg:text-lg hover:underline"
                                >
                                    📍 {post.title.replace(/<b>/g, "").replace(/<\/b>/g, "")}
                                </a>
                                <p className="text-sm lg:text-base mt-1 text-gray-900">
                                    {post.description.replace(/<b>/g, "").replace(/<\/b>/g, "")}
                                </p>
                                <p className="text-gray-500 text-xs mt-1">
                                    🕒 {formatPostDate(post.postdate)}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}