import "../homeStyles.css";
import { NavLink } from "react-router-dom";
import candleStick from "../../assets/candlestick-svgrepo-com.svg";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
export default function RootNav() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const checkAuth = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/is_authenticated",
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setIsLoggedIn(true);
        console.log("User is authenticated");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log("user not authenticated" + error);
      navigate("/");
    }
  };
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/sign_out",
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        console.log("User logged out");
        setIsLoggedIn(false);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <>
      <div className="bg-blue-500 flex justify-center ">
        <nav className="container max-w-3xl">
          <NavLink to='/'>
            <div className="flex justify-start">
              <span className="text-xl sm:text-3xl uppercase">
                <span className="bold">trade</span>vista
              </span>
            </div>
          </NavLink>
          <div className="flex justify-center items-center">
            <NavLink
              to="/profile"
              className="shadow-sm   flex justify-center items-center ml-2 p-1 md:p-3 bg-[#D0E7D2] rounded-full mx-1"
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
              className="profile p-3 md:p-5 shadow-sm bg-[#D0E7D2] rounded-full text-white mx-1"
            >
              <img src={candleStick} alt="" className="h-6 w-6" />
            </NavLink>
            {isLoggedIn ?
              <button
                onClick={handleLogout}
                className="p-3 md:p-5 shadow-sm bg-[#D0E7D2] rounded-full text-black mx-1"
              >
                <i className="fa-solid fa-right-from-bracket"></i>
              </button>
              : null}
          </div>
        </nav>
      </div>
    </>
  );
}