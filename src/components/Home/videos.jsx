import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { supabase } from '../../helpers/supabaseClient';
import { LoadingScreen } from '../LoadingScreen';
import { VideoComponents } from './Videos/VideoComponents';

const Videos = () => {
  const { id: videoId } = useParams() || {}; // add null check for useParams()
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
    session===undefined?<LoadingScreen/>:session===null?<Navigate to={'/#/account'}/>:
    <VideoComponents videoId={videoId} session={session}/> 
  )
}

export default Videos