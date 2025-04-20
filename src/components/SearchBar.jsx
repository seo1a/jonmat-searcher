export default function SearchBar({ inputQuery, setInputQuery, handleSearch }) {
    return(
        <form onSubmit={handleSearch} className="relative flex justify-center items-center w-full py-16">
            <input
                name="search"
                type="search"
                placeholder="식당을 검색해 보세요!😋"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                className="font-custom text-center w-2/5 p-2 text-base border-[1.5px] border-black rounded-xl"
            />
            <button type="submit" className="ml-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
            </button>   
        </form>
    );
}