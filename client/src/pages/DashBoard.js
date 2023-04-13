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
function DashBoard() {
  let navigate=useNavigate();
  const [cropdata, setCropdata] = useState([])
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
  navigator.geolocation.getCurrentPosition((e)=>{
      fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${e.coords.latitude}&lon=${e.coords.longitude}&appid=1ae67afbcfd2c8ace165befd341a1d70&units=metric`
        )
          .then((res) => res.json())
          .then(async(data) => {
            const tensorr=tf.tensor([[50.55 ,53.36 ,48.14 ,data?.main?.temp,data?.main?.humidity,0.77,200]])
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
setCropdata(top)
          })
          .catch((error) => console.log(error.message));
  });
} else {
 alert( "Geolocation is not supported by this browser.");
}


      }
      useEffect(() => {
       
        reccomdcrop()

      }, [])
      
  return (
    <div className='container m-auto mb-[5rem]'>
      <Weather/>
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