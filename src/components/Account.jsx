import React, { useEffect, useState } from 'react'
import { supabase } from '../helpers/supabaseClient'
import { Auth } from './Account/Auth'
import { Profile } from './Account/Profile'

export const Account = () => {

  //if user is logged in,show profile else show auth
  //check if user is logged in
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    console.log(session);
  }, [])
  

  return (
    <div>
      {session?<Profile key={session.user.id} session={session}/>:<Auth/>}
    </div>
  )
}
