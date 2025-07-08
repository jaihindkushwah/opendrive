"use client"
import React from 'react'
import { CarDataTable } from './car-table';

function Dashboard() {
  
  return (
    <div className='max-w-screen px-10 h-screen flex justify-center items-center flex-col'>
      <CarDataTable/>
    </div>
  )
}

export default Dashboard