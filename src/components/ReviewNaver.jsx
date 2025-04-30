export default function ReviewNaver({ details }) {
    function formatPostDate(dateStr) {
        if (!dateStr || dateStr.length !== 8) return dateStr;
        return `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6)}`;
    }
    
    if (!details || !details.blog) return null;

    return(
        <div>
            {details.blog.length > 0 && (
                <div className="max-w-3xl max-h-[700px] lg:max-h-[600px] overflow-y-scroll">
                    <ul className="mt-6 space-y-3">
                        {details.blog.map((post, i) => (
                            <li key={i} className="py-4 font-noto_sans border border-black rounded-xl
                            bg-gradient-to-b from-white via-violet-100 to-violet-200">
                                <a 
                                    href={post.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="block font-bold text-base lg:text-lg hover:underline px-4 lg:px-6"
                                >
                                    📍 {post.title.replace(/<b>/g, "").replace(/<\/b>/g, "")}
                                </a>
                                <p className="text-sm lg:text-base text-gray-900 mt-1 px-4 lg:px-6">
                                    <a
                                        href={post.link} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                    >
                                        {post.description.replace(/<b>/g, "").replace(/<\/b>/g, "")}
                                    </a>
                                </p>
                                <p className="text-gray-500 text-xs mt-1 px-4 lg:px-6">
                                    🕒 {formatPostDate(post.postdate)}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );


    /*
    말풍선 없는 버전
    return(
        <div>
            {details.blog.length > 0 && (
                <div className="max-w-3xl max-h-[700px] lg:max-h-[600px] 
                mx-3 lg:mx-0 overflow-y-scroll pr-2">
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
    */
}