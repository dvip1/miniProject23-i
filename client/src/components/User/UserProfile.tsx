import avatar from "../../assets/avatar.png";

const UserProfile = () => {
  return (
    <div className="flex flex-col items-center   bg-gradient-to-r from-purple-500 to-pink-500 py-12 px-4 sm:px-6 lg:px-8 min-h-screen">
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
          Stocks Lists
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
