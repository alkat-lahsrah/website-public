import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../helpers/supabaseClient";
import { AdminPage } from "./Admin/AdminPage";

export const Admin = () => {
  const [session, setSession] = useState(undefined);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      console.log(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      console.log(session);
    });
    
    console.log(session);
  }, []);
    

  return <div>
    {session===undefined?<></>:(session===null ? <Navigate to="/account"></Navigate> : (session.user.role==="service_role"?<AdminPage session={session}/>:<Navigate to="/home"></Navigate>))}
  </div>;
};
