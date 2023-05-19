import React,{useEffect,useState} from 'react'
import Weather from '../components/Weather'
import LabelBottomNavigation from '../components/BelowNavigation'
import CropCard from '../components/CropCard'
import DiseasePred from '../components/DiseasePred'
import DroughtPred from '../components/DroughtPred'
import {useNavigate} from 'react-router-dom'
import $ from 'jquery'
import CROP from '../static/crop'
import * as tf from '@tensorflow/tfjs';
import ChatBot from '../components/ChatBot'
import queryString from 'query-string';
import {useLocation} from 'react-router-dom'
import Cookies from 'js-cookie'
import RAINFALL from '../static/rainfall' 
import {useUserAuth} from "../context/tasks/UserAuthContext";
import axios from 'axios'
import Activity from '../components/Activity'
import Profile from '../components/Profile'
import CROPDETAILS from '../static/cropdetails'


function DashBoard({cropdata,setCropdata,change,host}) {

const [name, setName] = useState("")
const [phone, setPhone] = useState("")
const {user}=useUserAuth()
  // let location=useLocation()
  // const {change} = queryString.parse(location.search); 
  let navigate=useNavigate();
  const [profile, setProfile] = useState(false)
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
  
  
 
      const reccomdcrop=async()=>{
        // const model = await tf.loadGraphModel('cropmodel/model.json');
        
        // console.log(model);
//         let img = $('#temp').get(0);
// let tensorr1=tf.browser.fromPixels(img).resizeNearestNeighbor([224,224]).toFloat();
// const offset = tf.scalar(255.0);
// const normalized = tf.scalar(1.0).sub(tensorr1.div(offset));

// const tensorr = normalized.expandDims(0)
// console.log(tensorr)

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(async(e)=>{
    const weather=await  fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${e.coords.latitude}&lon=${e.coords.longitude}&appid=1ae67afbcfd2c8ace165befd341a1d70&units=metric`
        )
         const data=await weather.json()
const stateinfo=await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&zoom=18&addressdetails=1&lat=${e.coords.latitude}&lon=${e.coords.longitude}`)
const d=await stateinfo.json();
let month=new Date().toString().split(' ')[1].toUpperCase()
console.log(month)
const res=d?.address?.state?.split(' ')?.join('')?.toString()?.toUpperCase()
const rainfall=RAINFALL[res][month]
console.log(rainfall);
//             const tensorr=tf.tensor([[50.55 ,53.36 ,48.14 ,data?.main?.temp,data?.main?.humidity,0.77,rainfall]])
// let predictions=await model.predict(tensorr).data()

// let tensorres= predictions
// console.log(tensorres)
// let top = Array.from(tensorres).map(function (p, i) { // this is Array.map
// return {
//  probability: p,
// // we are selecting the value from the obj
// className:CROP[i]
// };
// }).sort(function (a, b) {
// return b.probability - a.probability;
// })
// console.log(top);
// setCropdata(top[0])
     const payload={
      nitrogen:50.55,phosphrous:53.36,potassium:48.14,temp:data?.main?.temp,humidity:data?.main?.humidity,ph:0.77,rainfall:rainfall
    }
const resp=await axios.post('http://127.0.0.1:5000/predictcrop',payload)
const dat=resp.data;
let top = Array.from(dat).map(function (p, i) { // this is Array.map
return {
 probability: p,
// we are selecting the value from the obj
description:CROPDETAILS[i],
className:CROP[i]
};
}).sort(function (a, b) {
return b.probability - a.probability;
})
console.log(top);
setCropdata(top[0])
  });
} else {
 alert( "Geolocation is not supported by this browser.");
}


      }
      useEffect(() => {
        if(!Cookies.get('auth-Tokennpk')|| !user)
       return navigate('/login')
        if(!change)
        reccomdcrop()
          getuserinfo()
      }, [])
      
  return (
    <div className='container m-auto  mb-[5rem] bg-gray-50'>
      <div className='font-semibold text-xl pt-6 px-5  mb-7'>
        Welcome, <span className='font-bold text-green-900'>{name}</span> 
      </div>
      <Weather/>
    
      <CropCard recommended={cropdata} host={host}/>
      <div className='grid grid-cols-2 gap-2  px-5 bg-gray-50'>
        <div onClick={()=>navigate('/disease_predictor')}>
        <DiseasePred/>
        </div>
        <div>
        <DroughtPred/>

        </div>
      
      </div>
      <div>
        <div className='text-center font-bold my-4'>ChatBot Assistant</div>
        <ChatBot/>
      </div>
      {/* <LabelBottomNavigation setProfile={setProfile} profile={profile}/> */}
    </div>
  )
}

export default DashBoard