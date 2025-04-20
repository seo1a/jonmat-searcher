import { useState } from "react";
import Map from "../components/Map"
import Button from "../components/UI/Button";
import ReviewNaver from "../components/reviewNaver";
import ImageNaver from "../components/ImageNaver";

export default function Home({ query, blogPosts, images }) {
    
    const [selectedPlatform, setSelectedPlatform] = useState("Naver");

    return(
        <>
            <div>
                <div className="flex mt-12 ml-52 mr-52">
                    <div className="flex flex-col">
                        <h1 className="font-customBold mb-12 text-2xl text-left">
                            #{query}의 리뷰를 보여 드릴게요! ฅ₍ˆ- ̫-ˆ₎‧˚🐾
                        </h1>
                        <Map />
                    </div>

                    <div className="flex flex-col">
                        <div className="flex space-x-8 mt-20 ml-28">
                            <Button platform="Naver" setSelectedPlatform={setSelectedPlatform} className="bg-buttonNaver"/>
                            <Button platform="Google" setSelectedPlatform={setSelectedPlatform} className="bg-buttonGoogle"/>
                            <Button platform="Kakao" setSelectedPlatform={setSelectedPlatform} className="bg-buttonKakao"/>
                        </div>
                        <ReviewNaver blogPosts={blogPosts} />
                    </div>
                </div>
            </div>
            <div>
                <ImageNaver images={images} />
            </div>
        </>
    );
}