// import React from 'react'
// import test from '../static/rice.jpg'
// import {Rice,Moth,Pomegranate,Papaya,Orange,Muskmelon,Mango,Apple,Grapes,Banana,Chick,Pigeon,Adzuki,Black,Coconut,Kidney,Wheat,Tobacco,Sugarcane,Rubber,Peas,Ground,Cotton,Coffee,Jute,Lentil,Maize,Millet,Tea,Mung,Watermelon} from '../static/Rice.jpg'
import {useNavigate} from 'react-router-dom'
import { useRef } from 'react';

import {
  Collapse,
  Ripple,
  initTE,
} from "tw-elements";
function CropCard({recommended,host}) {
  let ref=useRef()
  initTE({ Collapse, Ripple });
  let navigate=useNavigate();
  
 let img=recommended?.className?.split(' ')[0]
  return (
    <div className=" my-7 px-5 md:px-0">
      <div className="font-bold text-xl pb-4">Recommended Crop</div>
      <div onClick={()=>{ref.current.click()}} className="flex flex-col items-center bg-white border border-gray-200 rounded-lg   hover:bg-gray-100 dark:border-gray-200 dark:bg-gray-200 dark:hover:bg-gray-200  m-auto shadow-lg">
        <div className="w-[100%] h-[100px] md:h-[40vh] overflow-clip">
          {" "}
          <img
            className="object-cover w-full rounded-t-lg h-[100%]  md:rounded-none md:rounded-l-lg"
            src={`${host}/static/${img}.jpg`}
            alt=""
          />
        </div>
        <div className="flex w-[100%] items-center gap-4 justify-between  px-3 leading-normal">
          <div className="mb-2 ">
            <div className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-700 text-center">
              {recommended?.className}
            </div>
            <div className="text-gray-500 font-semibold">{(recommended?.probability*100).toFixed(2)}</div>
          </div>

          <div className="mb-3 font-normal text-green-300 dark:text-gray-400">
            <div>
              {/* <button className="px-3 py-2 bg-gray-700 rounded  text-white">
                Change
              </button> */}
              <button onClick={()=>{
                navigate('/recommended_crop')
              }}
                type="submit"
                className="px-2 py-1 text-lg  text-white transition-colors duration-300 bg-green-500 rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring-green-200 focus:ring-4"
              >
                Change
              </button>
            </div>
          </div>
        </div>
      </div>
     <div>
     <button ref={ref} 
  className=" hidden  rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
  type="button"
  data-te-collapse-init
  data-te-ripple-init
  data-te-ripple-color="light"
  data-te-target="#collapseExample"
  aria-expanded="false"
  aria-controls="collapseExample">
  Button with data-te-target
</button>
<div className="!visible hidden" id="collapseExample" data-te-collapse-item>
  <div
    className="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 dark:text-neutral-50">
    {
      recommended?.description
    }
  </div>
</div>
     </div>

    </div>
  );
}

export default CropCard
