import logoImg from "/assets/logoImage.png"

export default function Header({ setInputQuery, setSubmittedQuery }) {
    const handleLogoClick = () => {
        setInputQuery("");
        setSubmittedQuery("");  
    }
    
    return (
        <main>
            <div className="flex justify-center items-center h-45 mt-8 lg:mt-10 cursor-pointer">
                <img src={logoImg} alt="logoImg" className="w-5/6 lg:w-auto h-auto lg:h-60" onClick={handleLogoClick} />
            </div>
        </main>
    );
}