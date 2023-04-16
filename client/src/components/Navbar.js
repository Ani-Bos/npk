import * as React from "react";
import {Link} from 'react-router-dom'

import { useLocation } from "react-router-dom";

import Cookies from 'js-cookie'
import {useUserAuth} from '../context/tasks/UserAuthContext'
function Navbar() {
  let location=useLocation();
  let {user} =useUserAuth()
  return (
    <div>
      <nav className="bg-white dark:bg-white w-full z-20 top-0 left-0 border-b border-transparent ">
        <div className=" flex flex-wrap items-center justify-between mx-auto p-4">
         
         <div>
         <Link to="/"  className="flex items-center">
            <img
              src="./images/NPK-logo.png"
              className="h-[3rem] mr-3"
              alt="NPK Logo"
            />
        
          </Link>
          </div> 
      { !(Cookies.get('auth-Tokennpk'))?  <div className="flex md:order-2">
            <Link to="/login"
              
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Login
            </Link>

         
          </div>:<>{(location.pathname==='/' || location.pathname==='/login')? <Link to="/dashboard"
              
              className="text-black border-2 border-green-400 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0"
            >
              Dashboard
            </Link>:<></> }</>}
     
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
