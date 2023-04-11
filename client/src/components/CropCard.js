// import React from 'react'
import test from '../static/rice.jpg'
function CropCard() {
  return (
    <div className=' my-7 px-5 md:px-0'>
        <div className='font-bold text-xl pb-4'>Recommended Crop</div>
<div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg  md:flex-row hover:bg-gray-100 dark:border-gray-200 dark:bg-gray-200 dark:hover:bg-gray-200  m-auto shadow-lg">
   <div className='w-[100%] h-[100px] overflow-clip'> <img class="object-cover w-full rounded-t-lg h-[100%] md:h-96  md:w-48 md:rounded-none md:rounded-l-lg" src={test} alt=""/></div>
    <div class="flex w-[100%] items-center gap-4 justify-between  px-3 leading-normal">
      
        <div class="mb-2 ">
          <div className='text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-700 text-center'>Rice</div> 
          <div className='text-gray-500 font-semibold'>
            90%
          </div>
        </div>

        <div class="mb-3 font-normal text-green-300 dark:text-gray-400">
          <div>
            <button className='px-3 py-2 bg-gray-700 rounded  text-white'>Change</button>
          </div>
        </div>
    </div>
</div>

    </div>
  )
}

export default CropCard
