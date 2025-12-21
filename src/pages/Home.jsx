import { useState } from "react";
import Map from "../components/Map"
import Button from "../components/UI/Button";
import ReviewNaver from "../components/ReviewNaver";
import ReviewGoogle from "../components/ReviewGoogle";
import ReviewKakao from "../components/ReviewKakao";
import ImageNaver from "../components/ImageNaver";
import ImageGoogle from "../components/ImageGoogle";
import ImageKakao from "../components/ImageKakao";

export function loading(data) {
    return(
        <div className="min-h-[300px] flex items-center justify-center">
            <div className="font-customBold text-gray-500 text-sm lg:text-xl sm:mx-2 lg:mt-48 w-full text-center animate-pulse">
                🔄 {data} 불러오는 중입니다... 🏃‍♀️🏃‍♂️💨
            </div>
        </div>
    )
}

export default function Home({ 
    inputQuery, submittedQuery, naverDetails, googleDetails, kakaoDetails, 
    kakaoPlaceId, setKakaoPlaceId, handleFranchisePlaces, 
    naverLoading, googleLoading, kakaoLoading
}) {
    const [selectedPlatform, setSelectedPlatform] = useState("Naver");

    const handlePlaceClick = (place) => {
        setSelectedPlace(place); // 사용자가 선택한 장소 정보 저장
    };

    return (
        <>
            <div className="flex flex-col lg:flex-row mt-4 lg:mt-12 px-4 lg:px-52">
                <div className="flex flex-col w-full lg:w-1/2 items-center lg:items-start">
                    <h1 className="font-customBold mb-6 lg:mb-12 text-base lg:text-2xl text-center lg:text-left break-words">
                        #{submittedQuery}의 리뷰를 보여 드릴게요! ฅ₍ˆ- ̫-ˆ₎‧˚🐾
                    </h1>
                    <Map inputQuery={inputQuery} submittedQuery={submittedQuery} setKakaoPlaceId={setKakaoPlaceId} handleFranchisePlaces={handleFranchisePlaces} onPlaceClick={handlePlaceClick} />
                </div>
    
                <div className="flex flex-col ml-9 mr-9 lg:ml-20 lg:mr-0 items-center md:items-start lg:w-full lg:max-w-[720px]">
                    <div className="flex space-x-4 lg:space-x-8">
                        <Button platform="Naver" setSelectedPlatform={setSelectedPlatform} className="bg-buttonNaver" />
                        <Button platform="Google" setSelectedPlatform={setSelectedPlatform} className="bg-buttonGoogle" />
                        <Button platform="Kakao" setSelectedPlatform={setSelectedPlatform} className="bg-buttonKakao" />
                    </div>
                    <div className="mt-8 lg:mt-12 w-full">
                        <div className="mx-[-12px] sm:mx-[-16px] md:mx-[-24px] lg:mx-0">
                            {selectedPlatform === "Naver" && (naverLoading ? loading("리뷰를") : <ReviewNaver details={naverDetails} />)}
                            {selectedPlatform === "Google" && (googleLoading ? loading("리뷰를") : <ReviewGoogle details={googleDetails} />)}
                            {selectedPlatform === "Kakao" && (kakaoLoading ? loading("리뷰를") : <ReviewKakao details={kakaoDetails} kakaoPlaceId={kakaoPlaceId} submittedQuery={submittedQuery} />)}
                        </div>
                    </div>
                </div>
            </div>
    
            <div className="flex flex-col mt-20 mx-9 mb-24 lg:mx-52 lg:mb-40">
                <h1 className="font-customBold mb-8 text-base lg:text-2xl text-center lg:text-left break-words">
                    📷 사진 구경하기 ( ◜⤙◝ )🍴
                </h1>
                {selectedPlatform === "Naver" && (naverLoading ? loading("사진을") : <ImageNaver details={naverDetails} />)}
                {selectedPlatform === "Google" && (googleLoading ? loading("사진을") : <ImageGoogle details={googleDetails} />)}
                {selectedPlatform === "Kakao" && (kakaoLoading ? loading("사진을") : <ImageKakao details={kakaoDetails} />)}
            </div>
        </>
    );
}