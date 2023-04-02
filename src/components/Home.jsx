import React from 'react'
import { Headers } from './Home/Headers'
import { Insights } from './Home/Insights'
import { Integrations } from './Home/Integrations'
import { Leads } from './Home/Leads'
import { Navbar } from './Home/Navbar'

export const Home = () => {
  return (
    <div className='bg-[#e7e7e7] text-[#333] w-screen'>
      <div className='backdrop-blur-lg absolute backdrop-filter w-screen top-0 z-50'>
        <Navbar></Navbar>
      </div>
      <div className='flex pt-[74px] h-screen gap-4 items-center overflow-scroll w-screen flex-col'>
        <Headers/>
        <Insights/>
        <Leads/>
        <Integrations/>
      </div>
    </div>
  )
}
