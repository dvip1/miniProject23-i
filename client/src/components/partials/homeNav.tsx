import "../homeStyles.css";
import { NavLink } from "react-router-dom";
import candleStick from "../../assets/candlestick-svgrepo-com.svg";
export default function RootNav() {
  return (
    <>
      <nav className="bg-blue-500">
        <div className="flex justify-start">
          <a href="#" className="navBrand">
            <span className="bold">trade</span>vista
          </a>
        </div>
        <div className="flex justify-center items-center">
        
          <NavLink
            to="/profile"
            className="shadow-sm   flex justify-center items-center ml-2 p-1 md:p-3 bg-[#89CFF3] rounded-full mx-1"
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
            className="profile p-3 md:p-5 shadow-sm bg-[#89CFF3] rounded-full text-white mx-1"
          >
            <img src={candleStick} alt="" className="h-6 w-6" />
          </NavLink>
        </div>
      </nav>
    </>
  );
}
