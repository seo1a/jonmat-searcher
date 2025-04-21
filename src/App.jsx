import axios from 'axios';
import { useState } from "react";
import Header from './components/Header'
import SearchBar from "./components/SearchBar";
import Home from "./pages/Home";

export default function App() {
  const [inputQuery, setInputQuery] = useState(""); // 실시간 검색어 입력값
  const [submittedQuery, setSubmittedQuery] = useState(""); // 제출된 검색어
  const [naverDetails, setNaverDetails] = useState(null);
  const [googleDetails, setGoogleDetails] = useState(null); // 구글 리뷰 객체


  // 검색
  const handleSearch = async (e) => {
    e.preventDefault();
    const trimmedQuery = inputQuery.trim();
    if (!trimmedQuery) return;

    setSubmittedQuery(trimmedQuery);
    
    try {
      // 구글 place ID, 리뷰, 사진 가져오기
      const searchRes = await axios.get(`/api/getPlaceId_google?query=${trimmedQuery}`);
      const { placeId, name } = searchRes.data;
      const googleDetailsRes = await axios.get(`/api/getReview_google?placeId=${placeId}`);

      setGoogleDetails({
        ...googleDetailsRes.data,
        placeId,
        name,
      });

      // 네이버 블로그 리뷰 가져오기
      const naverRes = await axios.get(`/api/getReview_naver?query=${trimmedQuery}`);

      setNaverDetails({
        blog: naverRes.data.blogItems,
        images: naverRes.data.imageItems,
      });

    } catch (error) {
        console.error(error);
        alert('검색에 실패했습니다.');
    }
  };

  return (
    <>
      <Header />
      <SearchBar inputQuery={inputQuery} setInputQuery={setInputQuery} handleSearch={handleSearch} />
      <Home query={submittedQuery} naverDetails={naverDetails} googleDetails={googleDetails} />
    </>
  )
}
