import logoImg from "/assets/logoImage.png"

export default function Header() {
    return (
        <main>
            <div className="flex justify-center items-center h-45 mt-10">
                <img src={logoImg} alt="logoImg" className="h-60"/>
            </div>
        </main>
    );
}