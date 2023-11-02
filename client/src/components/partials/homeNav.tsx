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
      <nav className="max-w-3xl container" >
        <div className="flex justify-start">
          <NavLink to="/" className="navBrand">
            <span className="bold">trade</span>vista
          </NavLink>
        </div>
        <div className="flex justify-center items-center">
          <NavLink
            to="/profile"
            className="shadow-sm  flex justify-center items-center ml-2 p-3 md:p-5 bg-[#D0E7D2] rounded-full mx-1 text-2xl"
          >
            <i className="fa-solid fa-user"></i>  
           
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