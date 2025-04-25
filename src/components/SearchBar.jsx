import { useState, useEffect } from "react";
import clickIcon from "../../public/assets/click-icon.png"

export default function SearchBar({ inputQuery, setInputQuery, submittedQuery, setSubmittedQuery, handleSearch, franchisePlaces }) {
    const [showDropdown, setShowDropdown] = useState(false);
    const [franchiseList, setFranchiseList] = useState([]);

    useEffect(() => {
        if(inputQuery.trim() === "" || inputQuery === submittedQuery){
            setFranchiseList([]);
            setShowDropdown(false);
        }
        else{
            const filteredList = franchisePlaces.map((place) => ({
                id: place.id,
                place: place.place_name,
            }));
            setFranchiseList(filteredList);
            setShowDropdown(filteredList.length > 0);
        }
    },[inputQuery, franchisePlaces])

    return(
        <form onSubmit={handleSearch} className="flex justify-center items-center w-full pt-10 lg:pt-16 pb-16 font-noto_sans">
            <div className="relative w-2/3 lg:w-2/5">
                <input
                    name="search"
                    type="search"
                    placeholder="식당을 검색해 보세요!😋"
                    value={inputQuery}
                    onChange={(e) => setInputQuery(e.target.value)}
                    className="text-center w-full h-10 lg:h-auto p-2 text-base border lg:border border-black rounded-xl lg:text-md"
                />
                <button 
                    type="submit" 
                    onClick={() => {
                        setSubmittedQuery(inputQuery);
                        setFranchiseList([]);
                        setShowDropdown(false);
                    }}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 px-1 py-1"
                >
                    <img src={clickIcon} alt="검색" className="w-6 h-6 lg:w-7 lg:h-7" />
                </button>   

                {showDropdown && inputQuery.trim().length > 0 && (
                    <ul className="absolute w-full left-0 top-full left-1/2 transform -translate-x-1/2 z-50 bg-white border border-black overflow-hidden bg-opacity-80">
                        {franchiseList.map((place) => (
                            <li 
                                key={place.id} 
                                className="ml-2 my-2 text-sm text-gray-600 hover:text-black cursor-pointer"
                                onClick={() => {
                                    const selected = place.place;

                                    setSubmittedQuery(selected);
                                    setInputQuery(selected);
                                    setFranchiseList([]);
                                    setShowDropdown(false);
                                }}
                            >                   
                                {place.place}
                            </li>
                        ))}
                    </ul>
                )}      
            </div>

            
        </form>
    );
}