import React from 'react'
import { RxCopy } from 'react-icons/rx'
import { ModalPopup } from './Leads/ModalPopup'
import { supabase } from '../../helpers/supabaseClient'

export const Headers = (props) => {
  const [uploading, setUploading] = React.useState(false)

  async function uploadVideo(event) {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      let { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      onUpload(event, filePath)
    } catch (error) {
      alert(error.message)
    } finally {
      setUploading(false)
    }
  }

  async function uploadVideo(event) {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      let { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      onUpload(event, filePath)
    } catch (error) {
      alert(error.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className='max-w-[1700px] rounded-sm bg-white w-screen'>
      <div className='flex justify-between items-center m-10'>
        {/* left */}
        <div className='flex flex-col'>
          <p className='text-4xl py-2'>{props.name || "NAME"}</p>
          <p className='text-xl py-2'>User id: {props.id || "User ID"}</p>
        </div>

        {/* right */}
        <div className='flex flex-col'>
          <div className='flex p-2 items-center rounded-sm gap-2 border-2'>
            <p>{props.id || "PARTNER ID"}</p>
            <button onClick={() => navigator.clipboard.writeText(props.id || "User ID")}
              className='flex items-center p-2 rounded-md bg-slate-300 active:bg-green-100 active:text-green-400 text-blue-600'>
              <RxCopy /> Copy
            </button>
          </div>
          <div className='flex items-end justify-end px-5 pt-4 gap-10 text-lg'>
            {/* <button className='bg-blue-800 rounded text-white p-2 px-4'><ModalPopup session={props.session} key={props.key}/></button> */}
            {/* <button className='bg-blue-800 rounded text-white p-2 px-4'>Add Video</button> */}
            <label className="button primary block bg-blue-600 rounded-lg p-2 text-white hover:bg-blue-500 active:bg-blue-700" htmlFor="single">
              {uploading ? 'Uploading ...' : 'Upload a video'}
            </label>
            <input
              style={{
                visibility: 'hidden',
                position: 'absolute',
              }}
              type="file"
              id="single"
              accept="video/*"
              onChange={uploadVideo}
              disabled={false}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
