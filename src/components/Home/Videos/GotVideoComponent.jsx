import React, { useEffect, useState } from 'react';
import { supabase } from '../../../helpers/supabaseClient';
import { LoadingScreen } from '../../LoadingScreen';

const GotVideoComponent = (props) => {
    const [vurl, setUrl] = useState(undefined);
    const [acUrl,setAcUrl]=useState(undefined);
    const videoExt = props.video.video_name.split('.').pop(); // A cleaner way to get the file extension
    const [data,setData] = useState(undefined)

    useEffect(() => {
        const addToUrl = `${props.session.user.id}/${props.video.video_name}`;
        setAcUrl(addToUrl);
        const downloadVideo = async (path) => {
            try {
                const { data, error } = await supabase.storage.from('videos').download(path, {
                    headers: {
                        authorization: `Bearer ${props.session.access_token}`,
                    },
                });
                if (error) {
                    throw error;
                }
                const url = URL.createObjectURL(data);
                setUrl(url);
            } catch (error) {
                console.error('Error downloading video: ', error.message);
            }
        };

        downloadVideo(addToUrl);
    }, [props.session.access_token, props.session.user.id, props.video.video_name]); // Dependencies

    const btnClicked = (url) => {
        // Define the full URL to your Flask endpoint
        const apiUrl = 'http://127.0.0.1:5000/api/analyze-video';
        setData(null)
        const data = { videoUrl: url };
    
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Include other headers as needed
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            // Handle response
            setData(data)
            console.log(data);
        })
        .catch(error => {
            setData(undefined)
            console.error('Error:', error);
        });
    };
    

    return (
        (vurl === undefined || data===null ) ? <LoadingScreen /> :
            <div className='w-screen'>
                <video controls>
                    <source src={vurl} type={`video/${videoExt}`} />
                </video>
                <button className='bg-blue-600 text-white p-1 rounded-md m-2' onClick={()=>btnClicked(acUrl)}>Analyze</button>
                <div className='w-screen'>
                    {JSON.stringify(data)}
                </div>
            </div>
            
    );
};

export default GotVideoComponent;
