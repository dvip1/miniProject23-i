import avatar from "../../assets/user.png";
import axios from "axios";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import Loading from "../loading";
import { useSelector } from "react-redux";
import { TrashIcon } from "@heroicons/react/16/solid";
import { useDispatch } from 'react-redux';
import { deleteSelectedStock } from '../../slices/selectedStocksSlice';

const UserProfile = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true); // Initialize loading state
  const purchasedStocks = useSelector(
    (state: any) => state.selectedStocks.data
  );
  function getLocalPart(email: string): string {
    const [localPart] = email.split('@');
    return localPart;
  }

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
        setEmail(getLocalPart(response.data.email));
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

      <div className="flex flex-col items-center bg-white py-12 px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="max-w-md w-full space-y-8 ">
          <div className="">
            <img className="mx-auto  w-[14vw]" src={avatar} alt="User Avatar" />
            <h2 className="mt-6 text-center  text-xl folt-bold text-gray-900">
              {email}
            </h2>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-3xl text-center pb-4 font-medium	font-sans">My Stocks</p>
          <div className="bg-white min-h-[50vh] w-[60vw] rounded-xl p-4">
            <div className="flex flex-col space-y-4">
              {purchasedStocks.map((stock: any, index: number) => {
                return (
                  <div key={index} className="grid grid-cols-4 gap-4 items-center bg-gray-100 p-2 rounded-md">
                    <p className="text-xl font-bold text-center">{stock.stockName}</p>
                    <p className="text-xl text-green-400 text-center">₹{stock.price}</p>
                    <p className="text-xl text-center">{stock.date}</p>
                    {stock.stockName !== "Company" && (
                      <button onClick={() => dispatch(deleteSelectedStock(index))} className="flex justify-center ">
                        <TrashIcon className=" h-6 w-5 text-red-500" />
                      </button>
                    )}
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
