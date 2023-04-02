import React from 'react'

export const Insights = () => {
  return (
    <div className='max-w-[1700px] rounded-sm bg-white w-screen'>
        <div className='flex flex-col justify-between m-10'>
            {/* top */}
            <div className='flex'>
                <p className='text-3xl font-bold py-2'>Insights</p>
            </div>

            {/* bottom */}
            <div className='flex gap-5'>
                <div className='flex flex-col border-2 p-4 gap-5 py-5 rounded-md basis-1/6'>
                    <p className='text-6xl'>0</p>
                    <p className='text-xl'>Total Leads</p>
                </div>
                <div className='flex flex-col border-2 p-4 gap-5 py-5 rounded-md basis-1/6'>
                    <p className='text-6xl'>0</p>
                    <p className='text-xl'>Processing Leads</p>
                </div>
                <div className='flex flex-col border-2 p-4 gap-5 py-5 rounded-md basis-1/6'>
                    <p className='text-6xl'>0</p>
                    <p className='text-xl'>Booked</p>
                </div>
            </div>
        </div>
    </div>
  )
}
