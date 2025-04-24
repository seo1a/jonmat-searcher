import axios from 'axios';
import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import Header from './components/Header'
import SearchBar from "./components/SearchBar";
import Home from "./pages/Home";

export default function App() {
  const [inputQuery, setInputQuery] = useState(""); // 실시간 검색어 입력값
  const [submittedQuery, setSubmittedQuery] = useState(""); // 제출된 검색어
  const [debouncedQuery] = useDebounce(inputQuery, 300);
  const [naverDetails, setNaverDetails] = useState(null); // 네이버 리뷰 객체
  const [googleDetails, setGoogleDetails] = useState(null); // 구글 리뷰 객체
  const [kakaoPlaceId, setKakaoPlaceId] = useState(null); // 카카오맵에서 가져온 카카오 placeID
  const [kakaoDetails, setKakaoDetails] = useState(null); // 카카오 리뷰 객체
  const [franchisePlaces, setFranchisePlaces] = useState([]); // 가맹점
  const [isLoading, setIsLoading] = useState(false);  // 데이터 로딩 상태 표시

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!submittedQuery.trim() || !kakaoPlaceId) return;

      setIsLoading(true); // 상태: 데이터 로딩 중

      try {
        // 네이버 블로그 포스트, 사진 가져오기
        const naverRes = await axios.get(`/api/getReview_naver?query=${submittedQuery}`);

        setNaverDetails({
          blog: naverRes.data.blogItems,
          images: naverRes.data.imageItems,
        });

        // 구글 place ID, 리뷰, 사진 가져오기
        const searchRes = await axios.get(`/api/getPlaceId_google?query=${submittedQuery}`);
        const { placeId, name } = searchRes.data;
        const googleRes = await axios.get(`/api/getReview_google?placeId=${placeId}`);

        setGoogleDetails({
          ...googleRes.data,
          placeId,
          name,
        });

        // 카카오 리뷰, 사진 가져오기
        const kakaoRes = await axios.get(`/api/getReview_kakao?placeId=${kakaoPlaceId}`);

        setKakaoDetails({
          status: kakaoRes.data.status,
          totalRating: kakaoRes.data.totalRating,
          reviews: kakaoRes.data.reviews,
          images: kakaoRes.data.images
        });
      } catch (error) {
        console.error(error);
        alert('검색에 실패했습니다.');
      } finally {
        setIsLoading(false);  // 상태: 데이터 로딩 완료
      }
    };

    fetchSearchResults();
  }, [submittedQuery, kakaoPlaceId]);

  /* 검색 */
  const handleSearch = (e) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;

    setSubmittedQuery(inputQuery);
  };

  /* Map.jsx에서 sortedPlaces (프랜차이저 / 연관 검색 장소)를 가져오기 위함 */
  const handleFranchisePlaces = (places) => {
    setFranchisePlaces(places);
  };

  return (
    <>
      <Header setInputQuery={setInputQuery} setSubmittedQuery={setSubmittedQuery} />
      <SearchBar inputQuery={inputQuery} setInputQuery={setInputQuery} submittedQuery={submittedQuery} setSubmittedQuery={setSubmittedQuery} handleSearch={handleSearch} franchisePlaces={franchisePlaces} />
      <Home inputQuery={debouncedQuery} submittedQuery={submittedQuery} 
            naverDetails={naverDetails} googleDetails={googleDetails} kakaoDetails={kakaoDetails} 
            kakaoPlaceId={kakaoPlaceId} setKakaoPlaceId={setKakaoPlaceId} 
            handleFranchisePlaces={handleFranchisePlaces} isLoading={isLoading}/>
    </>
  )
}
