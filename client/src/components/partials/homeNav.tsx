import "../homeStyles.css";
import { NavLink } from "react-router-dom";
import candleStick from "../../assets/candlestick-svgrepo-com.svg";
export default function RootNav() {
  return (
    <>
      <nav className="bg-gradient-to-r from-purple-300 to-purple-500">
        <div className="flex justify-start">
          <a href="#" className="navBrand">
            <span className="bold">trade</span>vista
          </a>
        </div>
        <div className="flex justify-center items-center">
          <NavLink to="signin" className="sign-in p-1 md:p-3 shadow-sm">
            Sign In
          </NavLink>
          <NavLink to="/signup" className="sign-up p-1 md:p-3 shadow-sm ml-1">
            Sign Up
          </NavLink>
          <NavLink
            to="/profile"
            className="shadow-sm text-white  flex justify-center items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-10 h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </NavLink>
          <NavLink
            to="/dashboard"
            className="profile p-1 md:p-3 shadow-sm bg-gradient-to-r from-green-300 to-green-600 rounded-full text-white mx-1"
          >
            <img src={candleStick} alt="" className="h-6 w-6" />
          </NavLink>
        </div>
      </nav>
    </>
  );
}
