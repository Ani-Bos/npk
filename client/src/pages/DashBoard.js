import React from 'react'
import Weather from '../components/Weather'
import LabelBottomNavigation from '../components/BelowNavigation'
import CropCard from '../components/CropCard'
import DiseasePred from '../components/DiseasePred'
import DroughtPred from '../components/DroughtPred'
import {useNavigate} from 'react-router-dom'
function DashBoard() {
  let navigate=useNavigate();

  return (
    <div className='container m-auto mb-[5rem]'>
      <Weather/>
      <CropCard/>
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