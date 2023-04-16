import React, { useState,useEffect } from 'react'
import { useNavigate } from "react-router";
import { useUserAuth } from '../context/tasks/UserAuthContext';
import LabelBottomNavigation from './BelowNavigation';
import Cookies from 'js-cookie'
import Avatar from 'react-avatar'
import axios from 'axios'
import {Link} from 'react-router-dom'
const Profile = ({host}) => {
  
  const [name, setName] = useState("")
  const [phone,setPhone]=useState("")
  const [ammenity, setAmmenity] = useState("")
  const [district, setDistrict] = useState("")
  const [state, setState] = useState("")
const [country, setCountry] = useState("")
  const getuserinfo=async()=>{

    const user=await axios.post(`${host}/api/auth/getuser`,{},{
      headers:{
        "auth-token":Cookies.get('auth-Tokennpk')
      }
    })
    const data=user.data;
    setName(data.user.name)
    setPhone(data.user.phone)
  }
    
      const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  
      const handleLogout = async () => {
        try {
          await logOut();
          Cookies.remove('auth-Tokennpk');
          navigate("/");
        } catch (error) {
          console.log(error.message);
        }
      };
      useEffect(() => {
       if(!user || !Cookies.get('auth-Tokennpk')){
       navigate('/login');
       return;
       }
        getuserinfo()
userposition()
      }, [])
      const userposition=()=>{
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async(e)=>{
        const stateinfo=await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&zoom=18&addressdetails=1&lat=${e.coords.latitude}&lon=${e.coords.longitude}`)
        const d=await stateinfo.json();
       setAmmenity(d.address.road)
       setDistrict(d.address.state_district)
       setState(d.address.state)
       setCountry(d.address.country)
          });
        } else {
         alert( "Geolocation is not supported by this browser.");
        }
      }
     
  return (
    <div className="flex items-center min-h-screen  p-4 bg-gray-100 lg:justify-center">
      <div className=" mb-8  flex flex-col w-full overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md">
        <div className="p-5 bg-white md:flex-1">
          <h3 className="my-4 text-2xl text-center font-semibold text-gray-700">
            Account Information
          </h3>
          <div className="flex flex-col space-y-5 justify-center items-center">
            <div>
              <Avatar name={name}/>
            </div>
            <div className="grid grid-cols-2 w-[50vw]  gap-4">
              <div className='font-bold text-lg '>
                    Name
              </div>
              <div  className='font-semibold text-lg'>
                    {name}
              </div>
           
            </div>
            <div className="grid grid-cols-2 w-[50vw]   gap-4">
              <div   className='font-bold text-lg  '>
                    Phone</div>
              <div  className='font-semibold text-lg'>
                    {phone}
              </div>
           
            </div>
            <div className="grid grid-cols-2 w-[50vw] gap-4">
              <div  className='font-bold text-lg '>
                    Address
              </div>
              <div className='font-semibold text-lg '>
                    {ammenity}, {district}, {state}, {country}
              </div>
           
            </div>
           
            
            

            <div class="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
              <Link to="/activity">
                <img
                  src="https://images.unsplash.com/photo-1492496913980-501348b61469?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8ZmFybXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                  alt="Product"
                  class="h-40 w-72 object-cover rounded-t-xl"
                />
                <div class="px-4 py-3 w-72">
                  
                  <p class="text-lg font-bold text-black truncate block capitalize">
                   Your Activity
                  </p>
                 
                </div>
              </Link>
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
      {/* <LabelBottomNavigation/> */}
    </div>
  );
};

export default Profile;
