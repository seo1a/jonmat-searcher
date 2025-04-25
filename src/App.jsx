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
  const [naverLoading, setNaverLoading] = useState(false);  // 데이터 로딩 상태 표시
  const [googleLoading, setGoogleLoading] = useState(false);
  const [kakaoLoading, setKakaoLoading] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!submittedQuery.trim() || !kakaoPlaceId) return;

      // 상태: 데이터 로딩 중
      setNaverLoading(true);
      setGoogleLoading(true);
      setKakaoLoading(true);

      try {
        // 네이버, 구글, 카카오 api 요청
        const naverReq = axios.get(`/api/getReview_naver?query=${submittedQuery}`);
        const googleReq = axios.get(`/api/getReview_google?query=${submittedQuery}`);
        const kakaoReq = axios.get(`/api/getReview_kakao?placeId=${kakaoPlaceId}`);

        naverReq.then((res) => setNaverDetails({
          blog: res.data.blogItems,
          images: res.data.imageItems,
        })).finally(() => setNaverLoading(false));

        googleReq.then((res) => setGoogleDetails({
            ...res.data
        })).finally(() => setGoogleLoading(false));
        
        kakaoReq.then((res) => setKakaoDetails({
          status: res.data.status,
          totalRating: res.data.totalRating,
          reviews: res.data.reviews,
          images: res.data.images
        })).finally(() => setKakaoLoading(false));
        
      } catch (error) {
        console.error(error);
        alert('검색에 실패했습니다.');
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
            handleFranchisePlaces={handleFranchisePlaces} 
            naverLoading={naverLoading} googleLoading={googleLoading} kakaoLoading={kakaoLoading}/>
    </>
  )
}
