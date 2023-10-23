
import "../homeStyles.css";
import { NavLink } from "react-router-dom";
export default function RootNav() {
  return (
    <>
      <nav>
        <div className="center">
          <a href="#" className="navBrand">
            <span className="bold">trade</span>vista
          </a>
        </div>
        <div className="right">
          <NavLink to="signin" className="sign-in p-1 md:p-3 shadow-sm">
            Sign In
          </NavLink>
          <NavLink to="/signup" className="sign-up p-1 md:p-3 shadow-sm ml-1">
            Sign Up
          </NavLink>
        </div>
      </nav>
    </>
  );
}

