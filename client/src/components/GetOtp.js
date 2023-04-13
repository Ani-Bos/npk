import React from "react";

function Login() {
  return (
    <div className="flex items-center min-h-screen  p-4 bg-gray-100 lg:justify-center">
      <div className="flex flex-col w-full overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md">
        <div className="p-5 bg-white md:flex-1">
          <h3 className="my-4 text-2xl text-center font-semibold text-gray-700">
            OTP Verification
          </h3>
          <form action="#" className="flex flex-col space-y-5">
            <div className="flex flex-col space-y-1">
              <div className="flex items-center justify-between">
                <label
                      for="number"
                      className="text-sm font-semibold text-gray-500"
                    >
                      Enter OTP
                    </label>
                 </div>
                 <input
                type="number"
                id="number"
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-green-200"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-green-500 rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring-green-200 focus:ring-4"
              >
                Verify & Proceed
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
