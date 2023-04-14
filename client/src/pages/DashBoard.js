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
import Map from '../components/Map'
import queryString from 'query-string';
import {useLocation} from 'react-router-dom'
import RAINFALL from '../static/rainfall' 
function DashBoard({cropdata,setCropdata,change}) {
  // let location=useLocation()
  // const {change} = queryString.parse(location.search); 
  
  let navigate=useNavigate();
 
      const reccomdcrop=async()=>{
        const model = await tf.loadGraphModel('cropmodel/model.json');
        
        console.log(model);
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
            const tensorr=tf.tensor([[50.55 ,53.36 ,48.14 ,data?.main?.temp,data?.main?.humidity,0.77,rainfall]])
let predictions=await model.predict(tensorr).data()

let tensorres= predictions
console.log(tensorres)
let top = Array.from(tensorres).map(function (p, i) { // this is Array.map
return {
 probability: p,
// we are selecting the value from the obj
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
       
        if(!change)
        reccomdcrop()

      }, [])
      
  return (
    <div className='container m-auto  mb-[5rem] '>
      {/* <Weather/> */}
      <div className='font-semibold text-xl px-5'>
        Welcome, Sachin
      </div>
      {/* <Map/> */}
      <CropCard recommended={cropdata}/>
      <div className='grid grid-cols-2 gap-2  px-5'>
        <div onClick={()=>navigate('/disease_predictor')}>
        <DiseasePred/>
        </div>
        <div>
        <DroughtPred/>

        </div>
      
      </div>
      <LabelBottomNavigation/>
    </div>
  )
}

export default DashBoard