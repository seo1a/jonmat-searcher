import axios from 'axios';
import { useState } from 'react';

// 컴포넌트 위에 정의
function formatPostDate(dateStr) {
    if (!dateStr || dateStr.length !== 8) return dateStr;
    return `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6)}`;
}

export default function ReviewList() {
  const [query, setQuery] = useState('');
  const [details, setDetails] = useState(null);
  const [blogPosts, setBlogPosts] = useState([]);
  const [images, setImages] = useState([]);

  const handleSearch = async () => {
    try {
        /* ✅ 구글 place ID, 리뷰, 사진 가져오기  */
        const searchRes = await axios.get(`/api/getPlaceId_google?query=${query}`);
        const { placeId, name } = searchRes.data;

        const detailsRes = await axios.get(`/api/getReview_google?placeId=${placeId}`);

        setDetails({
            ...detailsRes.data,
            placeId,
            name,
        });

        /* ✅ 네이버 블로그 리뷰 가져오기  */
        const blogRes = await axios.get(`/api/getReview_naver?query=${query}`);
        setBlogPosts(blogRes.data.blogItems || []);
        setImages(blogRes.data.imageItems || []);

    } catch (error) {
        console.error(error);
        alert('검색에 실패했습니다.');
    }
  }

  return(
    <div className="p-4">
        <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="식당명을 입력하세요"
            className="border p-2 mr-2"
        />
        <button onClick={handleSearch} className="bg-blue-600 text-white px-4 py-2 rounded">
            검색
        </button>

        {/* 조건부 렌더링 - details가 true 일 때만 <div>...</div> 렌더링 */}
        {details && (
            <div className="mt-4">
                <h2 className="text-xl font-bold">{details.name}</h2>
                <p>⭐️ {details.rating}</p>

                <h3 className="mt-3 font-semibold">리뷰</h3>
                <ul className="mt-1">
                {details.reviews.map((review, i) => (
                    <li key={i} className="border-t py-2">
                        <strong>{review.author_name} - ⭐ {review.rating}</strong>
                        <p>{review.text}</p>
                    </li>
                ))}
                </ul>
                <div className="flex flex-wrap gap-2 mt-4">
                    {console.log(details.photos)}
                    {details.photos.map((photo, i) => (
                        <div key={i} className="flex">
                            <img 
                                src={photo.url} 
                                alt={`photo-${i}`} 
                                className="w-24 h-auto" 
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* 네이버 블로그 영역 */}
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
