import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../helpers/supabaseClient";
import { AdminPage } from "./Admin/AdminPage";
import {LoadingScreen} from "./LoadingScreen";

export const Admin = () => {
  const [session, setSession] = useState(undefined);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    
  }, []);
    

  return <div>
    {session===undefined?<LoadingScreen/>:(session===null ? <Navigate to="/account"></Navigate> : (session.user.role==="service_role"?<AdminPage session={session}/>:<Navigate to="/home"></Navigate>))}
  </div>;
};
