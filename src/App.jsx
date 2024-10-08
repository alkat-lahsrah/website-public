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
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    
  }, [])
  

  return (
    <div className="">
      {session===undefined?<LoadingScreen/>:(session===null ? <Navigate to="/account"></Navigate> : <Navigate to="/home"></Navigate>)}
    </div>
  )
}

export default App
