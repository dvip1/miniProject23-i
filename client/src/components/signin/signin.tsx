import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
const SignIn = ({ }) => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();
    axios.post('http://localhost:5000/sign_in', JSON.stringify(userData), {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          console.log("User is authenticated");
          navigate("/profile");
          setErrorMessage("");
        } else if (response.status === 401) {
          setErrorMessage("User not authenticated");
        }
      })
      .catch(error => {
        setErrorMessage("An error occurred");
        console.log(error);

      });
  }

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  return (
    <div>
      <section className="my-container">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-slate-700"
          >
            Welcome Back!
          </a>
          <div className="w-full  rounded-lg shadow-md dark:border md:mt-0 sm:max-w-md xl:p-0  border-none  " style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.1), #D0E7D2' }}>
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-lg font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-slate-700">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    value={userData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-white focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-500 dark:ring-offset-gray-800"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-500"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-blue-500 hover:underline dark:text-slate-700"
                  >
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-fit text-black bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none font-medium rounded-2xl text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover-bg-blue-700 "
                >
                  sign in
                </button>
                <p className="text-red-900">{errorMessage}</p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default SignIn;