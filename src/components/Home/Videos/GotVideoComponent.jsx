import React, { useEffect, useState } from 'react'
import { supabase } from '../../../helpers/supabaseClient'
import { LoadingScreen } from '../../LoadingScreen'

const GotVideoComponent = (props) => {

    console.log('GotVideoComponent')
    console.log(props.session)
    console.log(props.videoId)
    console.log(props.video)
    const [vurl, setUrl] = useState(undefined)
    const arr=props.video.video_name.split('.')
    const videoExt=arr[arr.length-1]
    console.log(videoExt)
    const addToUrl = `${props.session.user.id}/${props.video.video_name}`
    downloadVideo(addToUrl)

    async function downloadVideo(path) {
        try {
            const { data, error } = await supabase.storage.from('videos').download(path, {
                headers: {
                    authorization: `Bearer ${props.session.access_token}`,
                },
            })
            if (error) {
                throw error
            }
            const url = URL.createObjectURL(data)
            console.log('downloaded video')
            console.log(url)
            setUrl(url)
        } catch (error) {
            console.log('Error downloading image: ', error.message)
        }
    }

    return (
        vurl === undefined ? <LoadingScreen /> :
            <div>
                <video controls>
                    <source src={vurl} type={"video/"+videoExt} />
                </video>
            </div>
    )
}

export default GotVideoComponent