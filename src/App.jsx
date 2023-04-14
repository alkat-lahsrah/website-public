import { useEffect, useState } from 'react'
import './App.css'
import {Navigate} from 'react-router-dom'
import { supabase } from './helpers/supabaseClient'
import { LoadingScreen } from './components/LoadingScreen'

function App() {

  const [session, setSession] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(()=>{return session==null?null:session})
      console.log(session);
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      console.log(session);
    })
    
    console.log(session);
  }, [])
  

  return (
    <div className="">
      {session===undefined?<LoadingScreen/>:(session===null ? <Navigate to="/account"></Navigate> : <Navigate to="/home"></Navigate>)}
      {/* {true ? <Navigate to="/home"></Navigate> : <Navigate to="/account"></Navigate>} */}
    </div>
  )
}

export default App
