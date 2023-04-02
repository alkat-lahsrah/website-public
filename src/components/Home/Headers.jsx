import React from 'react'
import {RxCopy} from 'react-icons/rx'

export const Headers = () => {
  return (
    <div className='max-w-[1700px] rounded-sm bg-white w-screen'>
        <div className='flex justify-between items-center m-10'>
            {/* left */}
            <div className='flex flex-col'>
                <p className='text-4xl py-2'>NAME</p>
                <p className='text-xl py-2'>Partner id: PARTNER ID</p>
            </div>

            {/* right */}
            <div className='flex flex-col'>
                <div className='flex p-2 items-center rounded-sm gap-2 border-2'>
                    <p>https://amberstudent.com/partners/edyou-abrod</p>
                    <button onClick={()=>navigator.clipboard.writeText("https://amberstudent.com/partners/edyou-abrod")} 
                      className='flex items-center p-2 rounded-md bg-slate-300 active:bg-green-300 active:text-green-700 text-blue-600'>
                      <RxCopy/> Copy
                    </button>
                </div>
                <div className='flex items-end justify-end px-5 pt-4 gap-10 text-lg'>
                    <button className='bg-blue-800 rounded text-white p-2 px-4'>Add Lead</button>
                    <button className='p-2 px-4 rounded bg-gray-400'>Share link</button>
                </div>
            </div>
        </div>
    </div>
  )
}
