import { useState } from "react";
import Map from "../components/Map"
import Button from "../components/UI/Button";
import ReviewNaver from "../components/ReviewNaver";
import ReviewGoogle from "../components/ReviewGoogle";
import ReviewKakao from "../components/ReviewKakao";
import ImageNaver from "../components/ImageNaver";
import ImageGoogle from "../components/ImageGoogle";
import ImageKakao from "../components/ImageKakao";

export default function Home({ inputQuery, submittedQuery, naverDetails, googleDetails, kakaoDetails, kakaoPlaceId, setKakaoPlaceId, handleFranchisePlaces }) {
    const [selectedPlatform, setSelectedPlatform] = useState("Naver");

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
                        <Map inputQuery={inputQuery} submittedQuery={submittedQuery} setKakaoPlaceId={setKakaoPlaceId} handleFranchisePlaces={handleFranchisePlaces} onPlaceClick={handlePlaceClick}/>
                    </div>

                    <div className="flex flex-col ml-20">
                        <div className="flex space-x-8 ml-14">
                            <Button platform="Naver" setSelectedPlatform={setSelectedPlatform} className="bg-buttonNaver"/>
                            <Button platform="Google" setSelectedPlatform={setSelectedPlatform} className="bg-buttonGoogle"/>
                            <Button platform="Kakao" setSelectedPlatform={setSelectedPlatform} className="bg-buttonKakao"/>
                        </div>
                        <div className="mt-12">
                            {submittedQuery !== "" && selectedPlatform === "Naver" && <ReviewNaver details={naverDetails} />}
                            {submittedQuery !== "" && selectedPlatform === "Google" && <ReviewGoogle details={googleDetails}/>}
                            {submittedQuery !== "" && selectedPlatform === "Kakao" && <ReviewKakao details={kakaoDetails} kakaoPlaceId={kakaoPlaceId} />}
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-20 ml-52 mr-52 mb-40">
                <h1 className="font-customBold mb-8 text-2xl text-left">
                    📷 사진 구경하기 ( ◜⤙◝ )🍴
                </h1>
                {submittedQuery !== "" && selectedPlatform === "Naver" && <ImageNaver details={naverDetails} />}
                {submittedQuery !== "" && selectedPlatform === "Google" && <ImageGoogle details={googleDetails} />}
                {submittedQuery !== "" && selectedPlatform === "Kakao" && <ImageKakao details={kakaoDetails}/>}
            </div>
        </>
    );
}