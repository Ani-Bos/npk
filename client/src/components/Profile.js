import React from 'react'
import { useNavigate } from "react-router";
import { useUserAuth } from '../context/tasks/UserAuthContext';
const Profile = () => {
      const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  
      const handleLogout = async () => {
        try {
          await logOut();
          navigate("/");
        } catch (error) {
          console.log(error.message);
        }
      };
  return (
    <div className="flex items-center min-h-screen  p-4 bg-gray-100 lg:justify-center">
      <div className="flex flex-col w-full overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md">
        <div className="p-5 bg-white md:flex-1">
          <h3 className="my-4 text-2xl text-center font-semibold text-gray-700">
            Account Information
          </h3>
          <div className="flex flex-col space-y-5 justify-center items-center">
            <div>
              <img
                src="./images/xx.jpeg"
                className="rounded-full w-24 h-24"
              ></img>
            </div>
            <span className="text-center"> {user && user.name}</span>

            <div class="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
              <a href="#">
                <img
                  src="https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                  alt="Product"
                  class="h-40 w-72 object-cover rounded-t-xl"
                />
                <div class="px-4 py-3 w-72">
                  <span class="text-gray-400 mr-3 uppercase text-xs">
                    Brand
                  </span>
                  <p class="text-lg font-bold text-black truncate block capitalize">
                    Product Name
                  </p>
                  <div class="flex items-center">
                    <p class="text-lg font-semibold text-black cursor-auto my-3">
                      $149
                    </p>
                    <del>
                      <p class="text-sm text-gray-600 cursor-auto ml-2">$199</p>
                    </del>
                    <div class="ml-auto">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        class="bi bi-bag-plus"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                        />
                        <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </a>
            </div>

            <div>
              <button
                onClick={handleLogout}
                type="submit"
                className=" px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4 mx-auto items-center"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
