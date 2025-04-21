import { useState } from "react";
import Map from "../components/Map"
import Button from "../components/UI/Button";
import ReviewNaver from "../components/reviewNaver";
import ReviewGoogle from "../components/reviewGoogle";
import ReviewKakao from "../components/reviewKakao";
import ImageNaver from "../components/ImageNaver";
import ImageGoogle from "../components/ImageGoogle";

export default function Home({ query, naverDetails, googleDetails }) {
    const [selectedPlatform, setSelectedPlatform] = useState("Naver");

    //test
    const handlePlaceSelect = (place_name, id) => {
        console.log(`📌 가장 가까운 장소: ${place_name}, ID: ${id}`);
        // 원한다면 여기서 place_name으로 서버 요청 등 가능
      };
    
      const handlePlaceClick = (place) => {
        setSelectedPlace(place); // 사용자가 선택한 장소 정보 저장
      };

    return(
        <>
            <div>
                <div className="flex mt-12 ml-52 mr-52">
                    <div className="flex flex-col">
                        <h1 className="font-customBold mb-12 text-2xl text-left">
                            #{query}의 리뷰를 보여 드릴게요! ฅ₍ˆ- ̫-ˆ₎‧˚🐾
                        </h1>
                        <Map query={query}  onPlaceClick={handlePlaceClick}/>
                    </div>

                    <div className="flex flex-col ml-20">
                        <div className="flex space-x-8 mt-20 ml-8">
                            <Button platform="Naver" setSelectedPlatform={setSelectedPlatform} className="bg-buttonNaver"/>
                            <Button platform="Google" setSelectedPlatform={setSelectedPlatform} className="bg-buttonGoogle"/>
                            <Button platform="Kakao" setSelectedPlatform={setSelectedPlatform} className="bg-buttonKakao"/>
                        </div>
                        <div className="mt-12">
                            {selectedPlatform === "Naver" && <ReviewNaver details={naverDetails} />}
                            {selectedPlatform === "Google" && <ReviewGoogle details={googleDetails}/>}
                            {selectedPlatform === "Kakao" && <ReviewKakao />}
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-24 ml-52 mr-52 mb-48">
                {selectedPlatform === "Naver" && <ImageNaver details={naverDetails} />}
                {selectedPlatform === "Google" && <ImageGoogle details={googleDetails} />}
            </div>
        </>
    );
}