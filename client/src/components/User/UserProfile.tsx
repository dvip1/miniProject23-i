import avatar from "../../assets/avatar.png";
import axios from "axios";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import Loading from "../loading";
import { useSelector } from "react-redux";
const UserProfile = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true); // Initialize loading state
  const purchasedStocks = useSelector(
    (state: any) => state.selectedStocks.data
  );

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
        setEmail(response.data.email);
        console.log("User is authenticated");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log("user not authenticated" + error);
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
    console.log(purchasedStocks);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>

      <div className="flex flex-col items-center bg-gradient-to-b from-blue-500 to-white py-12 px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img className="mx-auto  w-[14vw]" src={avatar} alt="User Avatar" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              User Name
            </h2>
          </div>
          <div className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <p className="text-3xl font-extrabold">My Stocks</p>
          <div className="bg-white min-h-[50vh] w-[60vw] rounded-xl">
            <div className="flex flex-col">
              {purchasedStocks.map((stock: any, index: number) => {
                return (
                  <div key={index} className="grid grid-cols-3">
                    <p className="text-xl font-bold text-center m-1">
                      {stock.stockName}
                    </p>
                    <p className="text-xl text-green-400 text-center m-1">
                      ₹{stock.price}
                    </p>
                    <p className="text-xl text-center m-1">{stock.date}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
