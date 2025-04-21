export default function ReviewNaver({ details }) {
    function formatPostDate(dateStr) {
        if (!dateStr || dateStr.length !== 8) return dateStr;
        return `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6)}`;
    }
    
    if (!details || !details.blog) return null;

    return(
        <div>
            {details.blog.length > 0 && (
                <div className="max-w-3xl max-h-[520px] overflow-y-scroll pr-2">
                    <ul className="space-y-3">
                        {details.blog.map((post, i) => (
                            <li key={i} className="border-b py-4">
                                <a 
                                    href={post.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="font-customRegular font-bold text-lg hover:underline"
                                >
                                    📍 {post.title.replace(/<b>/g, "").replace(/<\/b>/g, "")}
                                </a>
                                <p className="font-customRegular text-md mt-1">
                                    {post.description.replace(/<b>/g, "").replace(/<\/b>/g, "")}
                                </p>
                                <p className="font-customRegular text-gray-500 text-xs mt-1">
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