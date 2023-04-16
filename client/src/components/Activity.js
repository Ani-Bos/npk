import React, { useState,useEffect } from "react";
import axios from 'axios'
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/tasks/UserAuthContext";
import LabelBottomNavigation from "./BelowNavigation";
const Activity = ({host}) => {
  let navigate=useNavigate();
const {user}=useUserAuth();
  
  const [activity, setActivity] = useState([]);
  const fetchactivity=async()=>{
    const activity=await axios.post(`${host}/api/file/getdata`,{},{
      headers:{
        'auth-token':Cookies.get('auth-Tokennpk')
      }
    })
    const res=activity.data;
    setActivity(res);
  }
  useEffect(() => {
  if(!user||!Cookies.get('auth-Tokennpk'))
  navigate('/login');
  fetchactivity();
  }, [])
  
  return (
    <div className="bg-gray-50 mb-12">
      <div>
                <div className="dark:text-gray-700 text-lg pt-7 text-center font-semibold">Activity Dashboard</div>

               
         
           
          
          
          <div>
              <section class="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">

  {/* <!--   ✅ Product card 1 - Starts Here 👇 --> */}
  { activity.map((e)=>{
    return (
<div class="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
   
      <img src={`${host}/image/${e.filename}`} />
      <div class="px-4 py-3 w-72">
      <p>Category</p>
        <p class="text-lg font-bold text-black truncate block capitalize">{e.category}</p>
        <div class="flex items-center justify-between">
          <p>Probability</p>
          <p class="text-lg font-semibold text-black cursor-auto my-3">{((e.probability)*100).toFixed(2)}%</p>
         
         
        </div>
      </div>
   
  </div>
    )
  })  }
  {/* <!--   🛑 Product card 1 - Ends Here  -->

  <!--   ✅ Product card 2 - Starts Here 👇 --> */}
  
 
  </section>
  </div>
  </div>
 

{/* <LabelBottomNavigation/> */}
    </div>
  );
};
export default Activity;
