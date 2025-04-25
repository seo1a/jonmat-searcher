import { useState } from "react";
import Map from "../components/Map"
import Button from "../components/UI/Button";
import ReviewNaver from "../components/ReviewNaver";
import ReviewGoogle from "../components/ReviewGoogle";
import ReviewKakao from "../components/ReviewKakao";
import ImageNaver from "../components/ImageNaver";
import ImageGoogle from "../components/ImageGoogle";
import ImageKakao from "../components/ImageKakao";

export default function Home({ 
    inputQuery, submittedQuery, naverDetails, googleDetails, kakaoDetails, 
    kakaoPlaceId, setKakaoPlaceId, handleFranchisePlaces, isLoading 
}) {
    const [selectedPlatform, setSelectedPlatform] = useState("Naver");

    const handlePlaceClick = (place) => {
        setSelectedPlace(place); // 사용자가 선택한 장소 정보 저장
    };

    return(
        <>
            <div>
                <div className="flex flex-col lg:flex-row mt-4 lg:mt-12 px-4 lg:px-52">
                    <div className="flex flex-col w-full lg:w-1/2 items-center lg:items-start">
                        <h1 className="font-customBold mb-6 lg:mb-12 text-md lg:text-2xl text-center lg:text-left break-words items-center lg:items-start">
                            #{submittedQuery}의 <span className="block lg:hidden"></span>리뷰를 보여 드릴게요! ฅ₍ˆ- ̫-ˆ₎‧˚🐾
                        </h1>
                        <Map inputQuery={inputQuery} submittedQuery={submittedQuery} setKakaoPlaceId={setKakaoPlaceId} handleFranchisePlaces={handleFranchisePlaces} onPlaceClick={handlePlaceClick}/>
                    </div>

                    <div className="flex flex-col ml-9 mr-9 lg:ml-20 lg:mr-0 items-center md:items-start lg:w-full lg:max-w-[720px]">
                        <div className="flex space-x-4 lg:space-x-8 lg:ml-12 lg:mr-0">
                            <Button platform="Naver" setSelectedPlatform={setSelectedPlatform} className="bg-buttonNaver"/>
                            <Button platform="Google" setSelectedPlatform={setSelectedPlatform} className="bg-buttonGoogle"/>
                            <Button platform="Kakao" setSelectedPlatform={setSelectedPlatform} className="bg-buttonKakao"/>
                        </div>
                        <div className="mt-8 lg:mt-12 lg:w-full">
                            {isLoading ? (
                                <div className="min-h-[300px] flex items-center justify-center">
                                    <div className="font-customBold text-gray-500 text-md lg:text-xl w-full text-center animate-pulse">
                                        🔄 리뷰를 불러오는 중입니다... 🏃‍♀️🏃‍♂️💨
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {submittedQuery !== "" && selectedPlatform === "Naver" && <ReviewNaver details={naverDetails} />}
                                    {submittedQuery !== "" && selectedPlatform === "Google" && <ReviewGoogle details={googleDetails}/>}
                                    {submittedQuery !== "" && selectedPlatform === "Kakao" && <ReviewKakao details={kakaoDetails} kakaoPlaceId={kakaoPlaceId} />}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col mt-20 mx-9 mb-24 lg:mx-52 lg:mb-40">
                <h1 className="font-customBold mb-8 text-md lg:text-2xl text-center lg:text-left break-words">
                    📷 사진 구경하기 ( ◜⤙◝ )🍴
                </h1>
                {isLoading ? (
                    <div className="lg:mt-12 font-customBold text-gray-500 text-md lg:text-xl w-full text-center lg:text-left animate-pulse">
                        🔄 사진을 불러오는 중입니다... 🤸‍♂️🤸‍♀️💨
                    </div>
                ) : (
                    <>
                        {submittedQuery !== "" && selectedPlatform === "Naver" && 
                            <ImageNaver details={naverDetails} />
                        }
                        {
                        submittedQuery !== "" && selectedPlatform === "Google" && 
                            <ImageGoogle details={googleDetails} />
                        }
                        {
                        submittedQuery !== "" && selectedPlatform === "Kakao" && 
                            <ImageKakao details={kakaoDetails}/>
                        }
                    </>
                )}
            </div>
        </>
    );
}