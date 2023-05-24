import React, { useState, useEffect } from "react";
import CROP from "../static/crop";
import CROPDETAILS from '../static/cropdetails'
import * as tf from "@tensorflow/tfjs";
import { useNavigate } from "react-router-dom";
import RAINFALL from '../static/rainfall'
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ProgressBar from "../components/Loader";
import LabelBottomNavigation from "../components/BelowNavigation";
import axios from 'axios'
function Recommended_Crop({
  setExtraDetails,
  extraDetails,
  cropdata,
  setCropdata,
  setChange,
  host
}) {
  let navigate = useNavigate();
  const [loadmore, setLoadmore] = useState(false);
  const [cropData, setCropData] = useState([]);
  const [extraActive, setExtraActive] = useState(false);
  const [loader, setLoader] = useState(0);
  const handlechange = (e) => {
    setExtraDetails({ ...extraDetails, [e.target.name]: e.target.value });
  };
  const handlecropchange = (e) => {
    setCropdata(e);
    setChange(true);
    navigate("/dashboard");
  };
  const reccomdcrop = async () => {
    // const model = await tf.loadGraphModel("cropmodel/model.json");

    // console.log(model);
    //         let img = $('#temp').get(0);
    // let tensorr1=tf.browser.fromPixels(img).resizeNearestNeighbor([224,224]).toFloat();
    // const offset = tf.scalar(255.0);
    // const normalized = tf.scalar(1.0).sub(tensorr1.div(offset));

    // const tensorr = normalized.expandDims(0)
    // console.log(tensorr)

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async(e) => {
        setLoader(10)
        const weather=await  fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${e.coords.latitude}&lon=${e.coords.longitude}&appid=1ae67afbcfd2c8ace165befd341a1d70&units=metric`
        )
        setLoader(20)
        const data=await weather.json()
        setLoader(30)
        const stateinfo=await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&zoom=18&addressdetails=1&lat=${e.coords.latitude}&lon=${e.coords.longitude}`)
        setLoader(40)
        const d=await stateinfo.json();
        setLoader(50)
        let month=new Date().toString().split(' ')[1].toUpperCase()
        console.log(month)
        const res=d?.address?.state?.split(' ')?.join('')?.toString()?.toUpperCase()
        const rainfall=RAINFALL[res][month]
        console.log(rainfall);
        const payload={
          nitrogen:parseFloat(extraDetails?.nitrogen),phosphrous:parseFloat(extraDetails?.phosphrous),potassium:parseFloat(extraDetails?.potassium),temp:data?.main?.temp,humidity:data?.main?.humidity,ph:parseFloat(extraDetails?.ph),rainfall:rainfall
        }
    const resp=await axios.post('http://127.0.0.1:5000/predictcrop',payload)
    const dat=resp.data;
    let top = Array.from(dat).map(function (p, i) { // this is Array.map
    return {
     probability: p,
     description:CROPDETAILS[i],
    // we are selecting the value from the obj
    className:CROP[i]
    };
    }).sort(function (a, b) {
    return b.probability - a.probability;
    })
    console.log(top);
    setCropData(top)
            setLoader(100)

          })
          
      
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };
  useEffect(() => {
    reccomdcrop();
  }, []);
 
  return (
    <div className="container m-auto px-7 mb-[5rem]">
      <div className="text-center font-bold text-xl">
        Recommended Crop for you
      </div>
      <div className="py-5">
        <button
          className="font-semibold"
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          <ArrowBackIosNewIcon /> Back{" "}
        </button>
      </div>
      <div className="text-center mt-5">
        <button
          onClick={() => {
            setExtraActive(!extraActive);
          }}
          className="inline-block rounded-3xl px-4 outline-1 py-1.5 text-base font-medium leading-7 text-gray-800 shadow-sm ring-1 ring-gray-600 hover:bg-transparent hover:outline rounded-full"
        >
          Add NPK value
        </button>
      </div>
      <div>
        {extraActive && (<>          <div>
            <div>
              <div>
                <label
                  for="nitrogen"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Nitrogen
                </label>
                <input
                  type="number"
                  id="nitrogen"
                  value={extraDetails.nitrogen}
                  name="nitrogen"
                  class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={handlechange}
                />
              </div>
            </div>
            <div>
              <label
                for="phosphrous"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Phosphrous
              </label>
              <input
                type="number"
                id="phosphrous"
                value={extraDetails.phosphrous}
                name="phosphrous"
                class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={handlechange}
              />
            </div>
            <div>
              <label
                for="potassium"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Potassium
              </label>
              <input
                type="number"
                id="potassium"
                value={extraDetails.potassium}
                name="potassium"
                class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={handlechange}
              />
            </div>
            <div>
              <label
                for="ph"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                pH value
              </label>
              <input
                type="number"
                id="ph"
                min={0}
                max={14}
                name="ph"
                value={extraDetails.ph}
                class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={handlechange}
              />

            </div>

            <div className="my-5">
              <button
                className="px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-green-500 rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring-green-200 focus:ring-4 justify-center items-center"
                onClick={() => {
                  reccomdcrop();
                }}
              >
                Submit
              </button>
             
            </div>
          </div>

         {((loader>0)&&(loader<100))&& <div className="my-5">
          <ProgressBar progressPercentage={loader}/>
          </div>}
          </>
 )}
        <div className="my-5 font-bold">TOP 5</div>
        <ol class="relative border-l border-gray-200 dark:border-gray-700">
          {cropData?.slice(0, 5)?.map((e, i) => {
            return (
              <div key={i} className={`${(e?.probability * 100).toFixed(2)==='0.00'?"hidden":"block"}`}>
                <li class="mb-10 ml-6">
                  <span class="absolute flex items-center justify-center w-3 h-3 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                    <svg
                      height="15px"
                      width="15px"
                      version="1.1"
                      id="_x35_"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <g>
                        <g>
                          <path
                            style={{ fill: "#75A874" }}
                            d="M461.044,46.548C331.271-11.868,184.378,3.571,89.951,98.005
			C-0.94,188.893-18.62,328.363,32.254,454.389c-8.792,8.638-16.89,16.648-23.973,23.734c-5.857,5.857,0,0,0,0l21.188,21.188
			c1.946-1.945,0,0,0,0c7.083-7.087,15.092-15.181,23.731-23.977c126.023,50.878,265.493,33.194,356.38-57.693
			C504.014,323.207,519.46,176.315,461.044,46.548z"
                          />
                          <path
                            style={{ fill: "#5AA25A" }}
                            d="M17.463,511.318C16.697,512.083,16.415,512.361,17.463,511.318L17.463,511.318z"
                          />
                          <path
                            style={{ fill: "#5AA25A" }}
                            d="M21.188,507.592c-0.808,0.808-1.441,1.437-2.003,2.002
			C20.219,508.565,21.188,507.592,21.188,507.592z"
                          />
                          <path
                            style={{ fill: "#5AA25A" }}
                            d="M18.568,510.209c-0.393,0.393-0.765,0.765-1.069,1.073
			C17.763,511.017,18.135,510.646,18.568,510.209z"
                          />
                        </g>
                        <g>
                          <g>
                            <path
                              style={{ fill: "#79C17A" }}
                              d="M89.951,85.799C-4.491,180.233-19.93,327.126,38.493,456.892l422.55-422.55
				C331.271-24.074,184.378-8.635,89.951,85.799z"
                            />
                            <path
                              style={{ fill: "#67B765" }}
                              d="M409.579,405.435c-94.434,94.434-241.327,109.88-371.086,51.457l422.55-422.55
				C519.46,164.108,504.014,311.001,409.579,405.435z"
                            />
                          </g>
                          <path
                            style={{ fill: "#5AA25A" }}
                            d="M21.188,495.386c3.168-1.988,3.168-1.988,8.28-8.281
			C131.175,385.391,408.442,91.169,417.631,77.754C404.209,86.936,109.987,364.21,8.281,465.917C2.424,471.773,0,474.19,0,474.19
			L21.188,495.386z"
                          />
                          <path
                            style={{ fill: "#5AA25A" }}
                            d="M267.027,236.353c0,0,0,0,0-9.311c0-41.882-8.031-159.557-10.025-164.205
			c-2.009,4.648-10.033,122.323-10.033,164.205c-0.007,9.311-0.007,9.311-0.007,9.311H267.027z"
                          />
                          <path
                            style={{ fill: "#5AA25A" }}
                            d="M160.479,342.901c0,0,0,0,0-9.31c0-41.883-8.03-159.557-10.033-164.205
			c-2.009,4.647-10.033,122.329-10.033,164.205c0,9.31,0,9.31,0,9.31H160.479z"
                          />
                          <path
                            style={{ fill: "#5AA25A" }}
                            d="M260.813,230.139c0,0,0,0,9.31,0c41.882,0,159.557,8.023,164.205,10.033
			c-4.648,2.009-122.323,10.033-164.205,10.033c-9.31,0-9.31,0-9.31,0V230.139z"
                          />
                          <path
                            style={{ fill: "#5AA25A" }}
                            d="M154.265,336.686c0,0,0,0,9.311,0c41.875,0,159.557,8.031,164.205,10.033
			c-4.648,2.01-122.33,10.033-164.205,10.033c-9.311,0.007-9.311,0.007-9.311,0.007V336.686z"
                          />
                        </g>
                      </g>
                    </svg>
                  </span>
                  <div className="w-[60%] md:w-[40%] m-auto">
                    <img
                      src={`${host}/static/${e?.className?.split(" ")[0]}.jpg`}
                      alt="temp"
                      className="w-full"
                    />
                  </div>
                  <h3 class="flex items-center justify-between my-2 text-xl font-semibold text-gray-900 dark:text-black">
                    {e?.className}
                    <span
                      class="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ml-3"
                      onClick={() => {
                        handlecropchange(e);
                      }}
                    >
                      Change
                    </span>
                  </h3>
                  <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{`${(
                    e?.probability * 100
                  ).toFixed(2)} %`}</time>
                  <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                    {e?.description}
                  </p>
                </li>
              </div>
            );
          })}
        </ol>
      </div>
      <section>
        <div className="cursor-pointer my-5 text-center">
          <button
            onClick={() => setLoadmore(!loadmore)}
            className="bg-gray-200 px-2 py-2 font-semibold rounded-md"
          >
            <div>{loadmore === false ? "expand" : "collapse"}</div>
          </button>
        </div>
        {loadmore && (
          <div>
            <ol class="relative border-l border-gray-200 dark:border-gray-700">
              {cropData?.slice(5, 10)?.map((e, i) => {
                return (
                  <div key={i} className={`${(e?.probability * 100).toFixed(2)==='0.00'?"hidden":"block"}`}>
                    <li class="mb-10 ml-6">
                      <span class="absolute flex items-center justify-center w-3 h-3 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                        <svg
                          height="15px"
                          width="15px"
                          version="1.1"
                          id="_x35_"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <g>
                            <g>
                              <path
                                style={{ fill: "#75A874" }}
                                d="M461.044,46.548C331.271-11.868,184.378,3.571,89.951,98.005
        C-0.94,188.893-18.62,328.363,32.254,454.389c-8.792,8.638-16.89,16.648-23.973,23.734c-5.857,5.857,0,0,0,0l21.188,21.188
        c1.946-1.945,0,0,0,0c7.083-7.087,15.092-15.181,23.731-23.977c126.023,50.878,265.493,33.194,356.38-57.693
        C504.014,323.207,519.46,176.315,461.044,46.548z"
                              />
                              <path
                                style={{ fill: "#5AA25A" }}
                                d="M17.463,511.318C16.697,512.083,16.415,512.361,17.463,511.318L17.463,511.318z"
                              />
                              <path
                                style={{ fill: "#5AA25A" }}
                                d="M21.188,507.592c-0.808,0.808-1.441,1.437-2.003,2.002
        C20.219,508.565,21.188,507.592,21.188,507.592z"
                              />
                              <path
                                style={{ fill: "#5AA25A" }}
                                d="M18.568,510.209c-0.393,0.393-0.765,0.765-1.069,1.073
        C17.763,511.017,18.135,510.646,18.568,510.209z"
                              />
                            </g>
                            <g>
                              <g>
                                <path
                                  style={{ fill: "#79C17A" }}
                                  d="M89.951,85.799C-4.491,180.233-19.93,327.126,38.493,456.892l422.55-422.55
            C331.271-24.074,184.378-8.635,89.951,85.799z"
                                />
                                <path
                                  style={{ fill: "#67B765" }}
                                  d="M409.579,405.435c-94.434,94.434-241.327,109.88-371.086,51.457l422.55-422.55
            C519.46,164.108,504.014,311.001,409.579,405.435z"
                                />
                              </g>
                              <path
                                style={{ fill: "#5AA25A" }}
                                d="M21.188,495.386c3.168-1.988,3.168-1.988,8.28-8.281
        C131.175,385.391,408.442,91.169,417.631,77.754C404.209,86.936,109.987,364.21,8.281,465.917C2.424,471.773,0,474.19,0,474.19
        L21.188,495.386z"
                              />
                              <path
                                style={{ fill: "#5AA25A" }}
                                d="M267.027,236.353c0,0,0,0,0-9.311c0-41.882-8.031-159.557-10.025-164.205
        c-2.009,4.648-10.033,122.323-10.033,164.205c-0.007,9.311-0.007,9.311-0.007,9.311H267.027z"
                              />
                              <path
                                style={{ fill: "#5AA25A" }}
                                d="M160.479,342.901c0,0,0,0,0-9.31c0-41.883-8.03-159.557-10.033-164.205
        c-2.009,4.647-10.033,122.329-10.033,164.205c0,9.31,0,9.31,0,9.31H160.479z"
                              />
                              <path
                                style={{ fill: "#5AA25A" }}
                                d="M260.813,230.139c0,0,0,0,9.31,0c41.882,0,159.557,8.023,164.205,10.033
        c-4.648,2.009-122.323,10.033-164.205,10.033c-9.31,0-9.31,0-9.31,0V230.139z"
                              />
                              <path
                                style={{ fill: "#5AA25A" }}
                                d="M154.265,336.686c0,0,0,0,9.311,0c41.875,0,159.557,8.031,164.205,10.033
        c-4.648,2.01-122.33,10.033-164.205,10.033c-9.311,0.007-9.311,0.007-9.311,0.007V336.686z"
                              />
                            </g>
                          </g>
                        </svg>
                      </span>
                      <div className="w-[60%] md:w-[40%] m-auto">
                        <img
                          src={`${host}/static/${
                            e?.className?.split(" ")[0]
                          }.jpg`}
                          alt="temp"
                          className="w-full"
                        />
                      </div>
                      <h3 class="flex justify-between items-center my-2 text-xl font-semibold text-gray-900 dark:text-black">
                        {e?.className}
                        <span
                          class="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ml-3"
                          onClick={() => {
                            handlecropchange(e);
                          }}
                        >
                          Change
                        </span>
                      </h3>
                      <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{`${(
                        e?.probability * 100
                      ).toFixed(2)} %`}</time>
                      <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                      {e?.description}
                      </p>
                    </li>
                  </div>
                );
              })}
            </ol>
          </div>
        )}
      </section>
      <LabelBottomNavigation/>
    </div>
  );
}

export default Recommended_Crop;
