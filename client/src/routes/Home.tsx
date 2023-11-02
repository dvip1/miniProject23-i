import "../components/homeStyles.css";
import { NavLink } from 'react-router-dom';

export default function Home() {
  const fetchData = async (buttonValue: string) => {
    const response = await fetch("http://localhost:5000/get_data", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        button_value: buttonValue,
      }),
    });
    const data = await response.json();
    console.log(data);
  };
  return (
    <>
      <section className="my-container">
        <div className="  center ">
          <div className="text-center">
            <h1 className="text-5xl text-white mb-0 pb-0">TradeVista</h1>
            <p className="text-base text-slate-700 mt-3 p-0">Your one-stop shop for risk-free trading education..</p>
            <div className="mt-6">
              <NavLink to="signup" className="inline-block mx-4 py-2 px-4 text-lg text-white bg-blue-500 rounded-3xl hover:bg-blue-700 ">Sign Up</NavLink>
              <NavLink to="signin" className="inline-block mx-4 py-2 px-4 text-lg text-white bg-blue-500 rounded-3xl hover:bg-blue-700">Sign In</NavLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
