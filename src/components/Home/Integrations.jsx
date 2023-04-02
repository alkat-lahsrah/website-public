import React from 'react'
import {HiOutlineBookOpen} from 'react-icons/hi'

export const Integrations = () => {
  return (
    <div className='max-w-[1700px] rounded-sm bg-white w-screen'>
        <div className='flex flex-col justify-between m-10'>
            {/* top */}
            <div className='flex'>
                <p className='text-3xl font-bold py-2'>Integrations</p>
            </div>

            {/* bottom */}
            <div className='flex gap-5'>
                <div className='flex flex-col border-2 p-4 gap-5 py-5 rounded-md basis-1/2'>
                    <p className='text-3xl  font-semibold'>Widget Integrations</p>
                    <div className='flex justify-between'>
                        <p className='text-xl'>Integrate edyou widget</p>
                        <button className='border-2 border-blue-700 text-blue-800 rounded-md p-2 px-4 flex items-center gap-2'><HiOutlineBookOpen/>View</button>
                    </div>
                </div>
                <div className='flex flex-col border-2 p-4 gap-5 py-5 rounded-md basis-1/2'>
                    <p className='text-3xl font-semibold'>Inventories API</p>
                    <div className='flex justify-between'>
                        <p className='text-xl'>Get a list of filtered inventories</p>
                        <button className='border-2 border-blue-700 text-blue-800 rounded-md p-2 px-4 flex items-center gap-2'><HiOutlineBookOpen/>View</button>
                    </div>
                </div>
                <div className='flex flex-col border-2 p-4 gap-5 py-5 rounded-md basis-1/2'>
                    <p className='text-3xl font-semibold'>Leads API</p>
                    <div className='flex justify-between'>
                        <p className='text-xl'>Create a lead request on amberstudent</p>
                        <button className='border-2 border-blue-700 text-blue-800 rounded-md p-2 px-4 flex items-center gap-2'><HiOutlineBookOpen/>View</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
