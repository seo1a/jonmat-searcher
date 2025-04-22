import logoImg from "/assets/logoImage.png"

export default function Header({ setInputQuery, setSubmittedQuery }) {
    const handleLogoClick = () => {
        setInputQuery("");
        setSubmittedQuery("");  
    }
    
    return (
        <main>
            <div className="flex justify-center items-center h-45 mt-10 cursor-pointer">
                <img src={logoImg} alt="logoImg" className="h-60" onClick={handleLogoClick} />
            </div>
        </main>
    );
}