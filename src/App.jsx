import axios from 'axios';
import { useState } from "react";
import Header from './components/Header'
import SearchBar from "./components/SearchBar";
import Home from "./pages/Home";

export default function App() {
  const [inputQuery, setInputQuery] = useState(""); // 실시간 검색어 입력값
  const [submittedQuery, setSubmittedQuery] = useState(""); // 제출된 검색어
  const [blogPosts, setBlogPosts] = useState([]); // 네이버 블로그 리뷰 (글)
  const [images, setImages] = useState([]); // 네이버 블로그 검색 이미지


  // 검색
  const handleSearch = async (e) => {
    e.preventDefault();
    const trimmedQuery = inputQuery.trim();
    if (!trimmedQuery) return;

    setSubmittedQuery(trimmedQuery);
    try {
      // 네이버 블로그 리뷰 가져오기
      const blogRes = await axios.get(`/api/getReview_naver?query=${trimmedQuery}`);
      setBlogPosts(blogRes.data.blogItems || []);
      setImages(blogRes.data.imageItems || []);

    } catch (error) {
        console.error(error);
        alert('검색에 실패했습니다.');
    }
  };

  return (
    <>
      <Header />
      <SearchBar inputQuery={inputQuery} setInputQuery={setInputQuery} handleSearch={handleSearch} />
      <Home query={submittedQuery} blogPosts={blogPosts} images={images} />
    </>
  )
}
