export default function Button({ platform, setSelectedPlatform, className }) {
    // prop의 className: Button png 파일 받아오기 위함
    
    const handleClick = () => {
        setSelectedPlatform(platform);
    };
    
    return (
        <button 
            className={`platform-button ${platform.toLowerCase()} 
            bg-contain bg-center bg-no-repeat 
            rounded-full w-44 h-20 aspect-[3/1] 
            cursor-pointer hover:opacity-90 ${className}`} 
            onClick={handleClick}
        >
          
        </button>
    );
}