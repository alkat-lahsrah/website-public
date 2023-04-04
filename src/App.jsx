import { useEffect, useState } from 'react'
import './App.css'
import {Navigate} from 'react-router-dom'
import { supabase } from './helpers/supabaseClient'

function App() {
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
    <div className="">
      <Navigate to={session.access_token ? "/home" : "/account"} replace />
    </div>
  );
}
export default App
