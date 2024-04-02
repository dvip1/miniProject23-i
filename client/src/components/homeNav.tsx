import "./homeStyles.css";
import { NavLink } from "react-router-dom";
import candleStick from "../assets/candlestick-svgrepo-com.svg";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { checkAuth } from "./checkIfAuth";
import { RootState } from "../store/store";
import { useHandleLogout } from "./handleLogOut";

export default function RootNav() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogOut = useHandleLogout();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  useEffect(() => {
    const authenticate = async () => {
      const isAuthenticated = await checkAuth(dispatch);
      console.log(`is Logged in ${isLoggedIn}`);
      if (!isAuthenticated) {
        navigate("/");
      }
    };
    authenticate();
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
                onClick={handleLogOut}
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