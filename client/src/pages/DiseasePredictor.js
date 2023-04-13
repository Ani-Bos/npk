import React,{useState} from 'react'
import $ from 'jquery'
import * as tf from '@tensorflow/tfjs';
import CLASSES from '../static/classes'
import ProgressBar from '../components/Loader';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {useNavigate} from 'react-router-dom'
function DiseasePredictor({setUpdatedisease}) {
  const [load, setLoad] = useState(0)
  let navigate=useNavigate();
      const [img, setImg] = useState("https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg")
        const handlechange=()=>{
            const file=document.getElementById('file_input').files[0];
            const image=window.URL.createObjectURL(file);
            setImg(image)
            let reader = new FileReader();
    reader.onload = function () {
      let dataURL = reader.result;
      $(`#temp`).attr("src", dataURL);
      // $("#prediction-list").empty();
     
    }
	let filer = $("#file_input").prop('files')[0];
	reader.readAsDataURL(filer);
        }
        const handlepredict=async()=>{
          setLoad(10)
            const model = await tf.loadGraphModel('model.json');
            setLoad(40);
            console.log(model);
            let img = $('#temp').get(0);
let tensorr1=tf.browser.fromPixels(img).resizeNearestNeighbor([224,224]).toFloat();
const offset = tf.scalar(255.0);
const normalized = tf.scalar(1.0).sub(tensorr1.div(offset));

const tensorr = normalized.expandDims(0)
console.log(tensorr)
let predictions=await model.predict(tensorr).softmax().data()
setLoad(70)
let tensorres= predictions
 console.log(tensorres)
 let top = Array.from(tensorres).map(function (p, i) { // this is Array.map
   return {
     probability: p,
    // we are selecting the value from the obj
    className: CLASSES[i]
   };
 }).sort(function (a, b) {
   return b.probability - a.probability;
 })
console.log(top)
setUpdatedisease(top)
setLoad(100);
navigate('/disease_predictor_result')
// top5.forEach(function (resp) {
//   //  $("#prediction-list").append(`<li>${p.className}: ${p.probability.toFixed(6)}</li>`);
 
//    }
//    );
        }
  return (
    <div className='container m-auto px-5 bg-gray-100 h-[100vh]'>
      <img className='hidden' alt="yoyo" id='temp' />
      <div>
        <button className='font-semibold' onClick={()=>{navigate('/dashboard')}}><ArrowBackIosNewIcon/> Back </button>
      </div>
        <div className='text-center font-bold py-7 text-xl'>Upload Image</div>
<div class="grid grid-cols-[40%_60%] h-[20vh] overflow-hidden bg-white border border-gray-200 rounded-lg shadow flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
  <div className='border border-r-[1px] flex flex-col' style={{backgroundImage:`url(${img})`,backgroundSize:"cover"}}>
  {/* <img class=" rounded-t-lg  md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={img} alt=""/> */}
    </div>  
    <div class="flex flex-col justify-between p-4 leading-normal">
       <div className='flex flex-col gap-4'>
       <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"  onChange={handlechange}/>
       <div>
        <button onClick={handlepredict} className='px-1 py-1 bg-slate-400 rounded text-sm'>Predict disease</button>
       </div>
       </div>
    </div>
</div>
<div className='my-6'>
<ProgressBar progressPercentage={load}/>
</div>
  
    </div>
  )
}

export default DiseasePredictor