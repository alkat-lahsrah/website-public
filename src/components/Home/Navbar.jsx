import React from 'react'
import { motion } from 'framer-motion'
import {BiSupport} from 'react-icons/bi'
import {CgProfile} from 'react-icons/cg'
import { Navigate } from 'react-router-dom'

export const Navbar = () => {
  return (
    <div className='flex bg-white justify-center'>
      <div className='w-screen flex justify-between font-mono items-center px-20 p-4'>
        <div className='flex gap-3 text-3xl font-bold'>
          <div className='flex'>
            <p className='text-orange-500'>Ed</p>
            <p className='text-green-400'>you</p>
          </div>   
          <p>Partners</p>
        </div>

        <div className='flex items-center gap-5'>
          <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} className='flex items-center gap-1 text-lg'><BiSupport/> Support</motion.button>
          <a href="/account"><motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} className='flex items-center gap-1 text-lg'><CgProfile/> Profile</motion.button></a>
        </div>
      </div>
    </div>
  )
}
