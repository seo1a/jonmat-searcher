import { useState, useEffect, useRef } from "react";

export default function SearchBar({ inputQuery, setInputQuery, submittedQuery, setSubmittedQuery, handleSearch, franchisePlaces }) {
    const [showDropdown, setShowDropdown] = useState(false);
    const [franchiseList, setFranchiseList] = useState([]);
    const wrapperRef = useRef(null);    // 드롭다운

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

    useEffect(() => {
        function handleClickOutside(event) {
            if(wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return(
        <form onSubmit={handleSearch} className="flex justify-center items-center w-full pt-10 lg:pt-16 pb-16 font-noto_sans">
            <div ref={wrapperRef} className="relative w-2/3 lg:w-2/5">
                <input
                    name="search"
                    type="search"
                    placeholder="식당을 검색해 보세요!😋"
                    value={inputQuery}
                    onChange={(e) => setInputQuery(e.target.value)}
                    className="text-center w-full h-10 p-2 text-sm lg:text-base border lg:border-[1.5px] border-black rounded-xl bg-white"
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
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </button>   

                {/*bg-gradient-to-b from-white via-purple-100 to-purple-200*/}
                {showDropdown && inputQuery.trim().length > 0 && (
                    <ul className="absolute w-full left-0 top-full left-1/2 
                    mt-1 lg:mt-2
                    transform -translate-x-1/2 z-50 
                    border border-black rounded-xl
                    overflow-hidden bg-opacity-80">
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