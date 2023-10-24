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
          <NavLink
            to="/profile"
            className="p-1 md:p-3 shadow-sm bg-pink-700 text-white rounded-full"
          >
            Profile
          </NavLink>
          <NavLink
            to="/dashboard"
            className="profile p-1 md:p-3 shadow-sm bg-gradient-to-r from-green-300 to-green-600 rounded-full text-white mx-1"
          >
            Dashboard
          </NavLink>
        </div>
      </nav>
    </>
  );
}
