// import React from 'react'
// import test from '../static/rice.jpg'
// import {Rice,Moth,Pomegranate,Papaya,Orange,Muskmelon,Mango,Apple,Grapes,Banana,Chick,Pigeon,Adzuki,Black,Coconut,Kidney,Wheat,Tobacco,Sugarcane,Rubber,Peas,Ground,Cotton,Coffee,Jute,Lentil,Maize,Millet,Tea,Mung,Watermelon} from '../static/Rice.jpg'
import {useNavigate} from 'react-router-dom'

function CropCard({recommended}) {
  let navigate=useNavigate();
  const host="http://localhost:5000"
 let img=recommended[0]?.className?.split(' ')[0]
  return (
    <div className=" my-7 px-5 md:px-0">
      <div className="font-bold text-xl pb-4">Recommended Crop</div>
      <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg  md:flex-row hover:bg-gray-100 dark:border-gray-200 dark:bg-gray-200 dark:hover:bg-gray-200  m-auto shadow-lg">
        <div className="w-[100%] h-[100px] overflow-clip">
          {" "}
          <img
            class="object-cover w-full rounded-t-lg h-[100%] md:h-96  md:w-48 md:rounded-none md:rounded-l-lg"
            src={`${host}/static/${img}.jpg`}
            alt=""
          />
        </div>
        <div class="flex w-[100%] items-center gap-4 justify-between  px-3 leading-normal">
          <div class="mb-2 ">
            <div className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-700 text-center">
              {recommended[0]?.className}
            </div>
            <div className="text-gray-500 font-semibold">{(recommended[0]?.probability*100).toFixed(2)}</div>
          </div>

          <div class="mb-3 font-normal text-green-300 dark:text-gray-400">
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
    </div>
  );
}

export default CropCard
