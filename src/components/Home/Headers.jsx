import React from 'react'
import {RxCopy} from 'react-icons/rx'
import { ModalPopup } from './Leads/ModalPopup'

export const Headers = (props) => {
  return (
    <div className='max-w-[1700px] rounded-sm bg-white w-screen'>
        <div className='flex justify-between items-center m-10'>
            {/* left */}
            <div className='flex flex-col'>
                <p className='text-4xl py-2'>{props.name||"NAME"}</p>
                <p className='text-xl py-2'>Partner id: {props.id||"PARTNER ID"}</p>
            </div>

            {/* right */}
            <div className='flex flex-col'>
                <div className='flex p-2 items-center rounded-sm gap-2 border-2'>
                    <p>{props.id||"PARTNER ID"}</p>
                    <button onClick={()=>navigator.clipboard.writeText(props.id||"PARTNER ID")} 
                      className='flex items-center p-2 rounded-md bg-slate-300 active:bg-green-100 active:text-green-400 text-blue-600'>
                      <RxCopy/> Copy
                    </button>
                </div>
                <div className='flex items-end justify-end px-5 pt-4 gap-10 text-lg'>
                    <button className='bg-blue-800 rounded text-white p-2 px-4'><ModalPopup session={props.session} key={props.key}/></button>
                </div>
            </div>
        </div>
    </div>
  )
}
