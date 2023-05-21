import React, { useState,useEffect } from "react";
import $ from "jquery";
import * as tf from "@tensorflow/tfjs";
import CLASSES from "../static/classes";
import ProgressBar from "../components/Loader";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
import disease from "../static/disease";
import {useUserAuth} from "../context/tasks/UserAuthContext";
import LabelBottomNavigation from "../components/BelowNavigation";
import axios from "axios";
function DiseasePredictor({ setUpdatedisease,host }) {
  const {user}=useUserAuth()
  useEffect(() => {
    if( !Cookies.get('auth-Tokennpk') || !user)
    return navigate('/login')
  }, [])
  
  const [load, setLoad] = useState(0);
  let navigate = useNavigate();
  const [img, setImg] = useState(
    "https://t3.ftcdn.net/jpg/03/45/05/92/360_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg"
  );
  const handleadddisease=async(top)=>{
    let a=document.getElementById('file').files[0];
    let formData=new FormData();
    formData.append('file',a);
    formData.append('category',top.className)
    formData.append('probability',top.probability)
    const add=await axios.post(`${host}/api/file/upload`,formData,{
      headers:{
        "Content-Type": "multipart/form-data",
        "auth-token":Cookies.get('auth-Tokennpk')
      }
    });
    const res=add.data;
    console.log(res);
    navigate("/disease_predictor_result");
  }
  const handlechange = () => {
    const file = document.getElementById("file").files[0];
    const image = window.URL.createObjectURL(file);
    setImg(image);
    let reader = new FileReader();
    reader.onload = function () {
      let dataURL = reader.result;
      $(`#temp`).attr("src", dataURL);
      // $("#prediction-list").empty();
    };
    let filer = $("#file").prop("files")[0];
    console.log(filer)
    reader.readAsDataURL(filer);
  };
  const handlepredict = async () => {
    setLoad(10);
    const model = await tf.loadGraphModel("https://storage.googleapis.com/drought-prediction-bucket/model1.json");
    setLoad(40);
 
    // let img = $("#temp").get(0);
    // console.log(img)
    // let tensorr1 = tf.browser
    //   .fromPixels(img)
    //   .resizeNearestNeighbor([224, 224])
    //   .toFloat();
    // const offset = tf.scalar(255.0);
    // const normalized = tf.scalar(1.0).sub(tensorr1.div(offset));

    // const tensorr = normalized.expandDims(0);
    // // let tensorr=tf.browser.fromPixels(img).resizeNearestNeighbor([224,224]).toFloat().div(tf.scalar(255.0)).expandDims()
    // // console.log(tensorr);
    // let predictions = await model.predict(tensorr).softmax().data();
    // setLoad(70);
    var a=document.getElementById('file').files
    const formdata= new FormData();
    formdata.append('file',a[0]);
    const resp=await axios.post('http://127.0.0.1:5000/predictdisease',formdata)
    const predictions=resp.data
    let top = Array.from(predictions)
      .map(function (p, i) {
        // this is Array.map
        return {
          probability: p,
          // we are selecting the value from the obj
          description:disease[i],
          className: CLASSES[i],
        };
      })
      .sort(function (a, b) {
        return b.probability - a.probability;
      });
    console.log(top);
    setUpdatedisease(top);
    setLoad(100);
    handleadddisease(top[0]);
  
    // top5.forEach(function (resp) {
    //   //  $("#prediction-list").append(`<li>${p.className}: ${p.probability.toFixed(6)}</li>`);

    //    }
    //    );
  };
  return (
    <div className="xs:container m-auto px-5 bg-gray-100 h-[100vh]">
      <img className="hidden" alt="yoyo" id="temp" />
      <div>
        {/* <button
          className="font-semibold"
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          <ArrowBackIosNewIcon /> Back{" "}
        </button> */}
      </div>
      <div className="text-center font-bold py-7 text-xl">Upload Image</div>
      <div className="w-60 h-60 justify-center align-center mx-5">
        <img src="Images/nf.png"></img>
      </div>
      <div class="grid md:grid-cols[30%_70%] grid-cols-[40%_60%] m-auto h-[20vh] md:h-[40vh] overflow-hidden bg-white border border-gray-200 rounded-lg shadow flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-green-400 dark:hover:bg-green-400">
        <div
          className="border border-r-[1px] flex flex-col"
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: "contain",
          }}
        >
          {/* <img class=" rounded-t-lg  md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={img} alt=""/> */}
        </div>
        <div class="flex flex-col justify-between p-4 leading-normal">
          <div className="flex flex-col gap-4">
            <input
              class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-blue-900 dark:border-gray-600 dark:placeholder-gray-400"
              id="file"
              type="file"
              onChange={handlechange}
            />
            <div>
              <button
                onClick={handlepredict}
                className="w-50 px-1 py-1 text-sm font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none justify-center m-auto"
              >
                Predict disease
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="my-6">
        <ProgressBar progressPercentage={load} />
      </div>
      {/* <LabelBottomNavigation/> */}
    </div>
  );
}

export default DiseasePredictor;
