import '../homeStyles.css';
export default function RootNav() {
    return (
        <>
            <nav>
                <div className="center">
                    <a href="#" className='navBrand'>
                        <span className="bold">trade</span>vista
                    </a>
                </div>
                <div className="right">
                    <button className="sign-in">
                        Sign In
                    </button>
                    <button className="sign-up">
                        Sign Up
                    </button>
                </div>
            </nav>
        </>
    );
}
