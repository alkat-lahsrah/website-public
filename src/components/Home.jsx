import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../helpers/supabaseClient'
import { Headers } from './Home/Headers'
import { Insights } from './Home/Insights'
import { Integrations } from './Home/Integrations'
import { Leads } from './Home/Leads'
import { Navbar } from './Home/Navbar'

export const Home = () => {
  
  const [session, setSession] = useState(); // <-- initially undefined

  useEffect(() => {
    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        setSession(session); // <-- set either null/user object
      });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session); // <-- set either null/user object
    });
  }, []);
  
  if (session === undefined) {
    return null; // or loading indicator/spinner/etc
  }


  return (
    session===undefined?<></>:(session.access_token==null?<Navigate to={'/account'}/>
    :<div className='bg-[#e7e7e7] text-[#333] w-screen' onFocus={()=>{console.log(session);}}>
      <div className='backdrop-blur-lg absolute border-2 backdrop-filter w-screen top-0 z-50'>
        <Navbar></Navbar>
      </div>
      <div className='flex pt-[74px] h-screen gap-4 items-center overflow-scroll w-screen flex-col'>
        <Headers/>
        <Insights/>
        <Leads/>
        <Integrations/>
      </div>
    </div>)
  )
}
