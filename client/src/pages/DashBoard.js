import React from 'react'
import Weather from '../components/Weather'
import LabelBottomNavigation from '../components/BelowNavigation'
import CropCard from '../components/CropCard'
import DiseasePred from '../components/DiseasePred'
import DroughtPred from '../components/DroughtPred'
function DashBoard() {
  return (
    <div className='container m-auto mb-[5rem]'>
      <Weather/>
      <CropCard/>
      <div className='grid grid-cols-2 gap-2  px-5'>
      <DiseasePred/>
      <DroughtPred/>
      </div>
      <LabelBottomNavigation/>
    </div>
  )
}

export default DashBoard