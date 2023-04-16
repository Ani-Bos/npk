import React,{useState} from 'react'
// import test from '../static/apple.jpeg'
import disease from '../static/disease'
import {useNavigate} from 'react-router-dom'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import LabelBottomNavigation from '../components/BelowNavigation';
function DisesasePredRes({diseasedata,host}) {
  let navigate=useNavigate()

  const [loadmore, setLoadmore] = useState(false)
  
  return (
    <div className='container m-auto px-7 bg-gray-50'>
        <div className='text-center font-bold text-lg my-5'>Prediction Result</div>
        <div>
        <button className='font-semibold' onClick={()=>{navigate('/disease_predictor')}}><ArrowBackIosNewIcon/> Back </button>
      </div>
       <div className='text-lg font-bold my-5'>
        Top 5
       </div>
<ol class="relative border-l border-gray-200 dark:border-gray-700">

  {diseasedata?.slice(0,5)?.map((e,i)=>{

    return (
        <li class="mb-10 ml-6" key={i}>            
        {/* <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
            <svg aria-hidden="true" class="w-3 h-3 text-blue-800 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
        </span> */}
        <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
        <div className='w-[60%] md:w-[40%] m-auto'> 
          <img src={`${host}/static/${e?.className?.split(" ")[0]}.jpg`} alt="temp" className='w-full' />
        </div>
        <h3 class="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-black">{e?.className}</h3>
        <div class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{`${(e?.probability*100).toFixed(2)} %`}</div>
        <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">{disease[e?.className]}</p>
       
    </li>
    )
  })  
    }
</ol>

<section>
  <div className='cursor-pointer my-5 text-center'>
    <button onClick={()=>setLoadmore(!loadmore)} className='bg-gray-200 px-2 py-2 font-semibold rounded-md'>
    <div>
      {loadmore===false?"expand":"collapse"}
    </div>
    </button>
    
  </div>
  {
    loadmore&& <div>
      <ol class="relative border-l border-gray-200 dark:border-gray-700">

{diseasedata?.slice(5,10)?.map((e,i)=>{

  return (
      <li class="mb-10 ml-6" key={`${i}2`}>            
      {/* <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
          <svg aria-hidden="true" class="w-3 h-3 text-blue-800 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
      </span> */}
      <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
      <div className='w-[60%] md:w-[40%] m-auto'> 
        <img  src={`${host}/static/${e?.className?.split(" ")[0]}.jpg`} alt="temp" className='w-full' />
      </div>
      <h3 class="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-black">{e?.className}</h3>
      <div class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{`${(e?.probability*100).toFixed(2)} %`}</div>
      <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">{disease[e?.className]}</p>
     
  </li>
  )
})  
  }
</ol>
    </div>
      
      }
</section>
<LabelBottomNavigation/>
    </div>
  )
}

export default DisesasePredRes