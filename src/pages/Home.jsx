import { useState, useEffect } from "react";
import Map from "../components/Map"
import Button from "../components/UI/Button";
import ReviewNaver from "../components/reviewNaver";
import ReviewGoogle from "../components/reviewGoogle";
import ReviewKakao from "../components/reviewKakao";
import ImageNaver from "../components/ImageNaver";
import ImageGoogle from "../components/ImageGoogle";

export default function Home({ inputQuery, submittedQuery, naverDetails, googleDetails, handleFranchisePlaces }) {
    const [selectedPlatform, setSelectedPlatform] = useState("Naver");

    //test, 수정필요!!!!!
    const handlePlaceClick = (place) => {
    setSelectedPlace(place); // 사용자가 선택한 장소 정보 저장
    };

    return(
        <>
            <div>
                <div className="flex mt-12 ml-52 mr-52">
                    <div className="flex flex-col">
                        <h1 className="font-customBold mb-12 text-2xl text-left">
                            #{submittedQuery}의 리뷰를 보여 드릴게요! ฅ₍ˆ- ̫-ˆ₎‧˚🐾
                        </h1>
                        <Map inputQuery={inputQuery} submittedQuery={submittedQuery} handleFranchisePlaces={handleFranchisePlaces} onPlaceClick={handlePlaceClick}/>
                    </div>

                    <div className="flex flex-col ml-20">
                        <div className="flex space-x-8 ml-8">
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