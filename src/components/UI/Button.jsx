export default function Button({ platform, setSelectedPlatform, className }) {
    // prop의 className: Button png 파일 받아오기 위함
    
    const handleClick = () => {
        setSelectedPlatform(platform);
    };
    
    return (
        <button 
            className={`platform-button ${platform.toLowerCase()} 
            bg-contain bg-center bg-no-repeat 
            rounded-full w-24 lg:w-44 h-auto lg:h-20 aspect-[2/1] lg:aspect-[3/1] 
            mt-8 lg:mt-0
            cursor-pointer hover:opacity-90 ${className}`} 
            onClick={handleClick}
        >
          
        </button>
    );
}