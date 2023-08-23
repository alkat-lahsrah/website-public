import React, { useEffect, useState } from 'react'
import { supabase } from '../../../helpers/supabaseClient'
import { LoadingScreen } from '../../LoadingScreen'
import GotVideoComponent from './GotVideoComponent'

export const VideoComponents = (props) => {

  const [video, setVideo] = useState(undefined)


  useEffect(() => {
    async function getVideo() {
      const { data, error } = await supabase
        .from('videouserlist')
        .select('*')
        .eq('video_id', props.videoId)
        .single()
      if (error) {
        console.log(error)
      } else if (data) {
        setVideo(data)
        console.log(data)
      }
    }
    getVideo()
  }, [])
  return (
    video === undefined ? <LoadingScreen /> : <GotVideoComponent video={video} session={props.session} videoId={props.videoId} />
  )
}
