import React from 'react'
import test from '../static/rice.jpg'
function DroughtPred() {
  return (
    <div>
          <div className='my-7 md:px-0'>
  <div class="grid rounded-lg">
  <div class="grid-cols-6">
    <div style={{backgroundImage:`url(${test})`,backgroundSize:"cover"}} className="object-cover w-full rounded-lg h-[20vh] md:h-96  md:w-48 md:rounded-none md:rounded-l-lg">
      <div class="card-overlay rounded-lg h-[20vh]">
        <div class="white-text text-center">
          <div class="card flex items-center">
              
              <p className='font-semibold flex w-[100%] h-[20vh] justify-center items-center text-white'>Drought Predictor</p>
               
         </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
    </div>
  )
}

export default DroughtPred