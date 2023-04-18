import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../helpers/supabaseClient'
import { HomeWithDataHandling } from './Home/HomeWithDataHandling'
import { Navbar } from './Home/Navbar'
import { LoadingScreen } from './LoadingScreen'

export const Home = () => {
  
  const [a_or_p, setAOrP] = useState("a");
  const [session, setSession] = useState(undefined)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    session===undefined?<LoadingScreen/>:session===null?<Navigate to={'/account'}/>:
    // true?
    <div id="home" className='bg-[#e7e7e7] text-[#333] w-screen'>
      <div className='backdrop-blur-lg absolute border-2 backdrop-filter w-screen top-0 z-50'>
        <Navbar a_or_p={a_or_p}/>
      </div>
      <HomeWithDataHandling session={session} setAOrP={setAOrP} key={session.user.id}/>
    </div>
  )
}


