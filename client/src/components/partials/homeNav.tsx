import { Link } from 'react-router-dom';
import '../homeStyles.css';

export default function RootNav() {
    return (
        <>
            <nav>
                <div className="center">
                    <Link to="/" className='navBrand'>
                        <span className="bold">trade</span>vista
                    </Link>
                </div>
                <div className="right">
                    <button className="sign-in">
                        Sign In
                    </button>
                    <Link to="/signup">
                        <button className="sign-up">
                            Sign Up
                        </button>
                    </Link>
                </div>
            </nav>
        </>
    );
}