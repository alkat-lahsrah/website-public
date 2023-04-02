import React, { useEffect, useState } from 'react'

export const Profile = ({session}) => {
    
    const [loading,setLoading]=useState(true)
    const [userName,setUserName]=useState(null)
    const [phoneNumber,setPhoneNumber]=useState(null)
    const [avatarUrl,setAvatarUrl]=useState(null)

    useEffect(()=>{
      async function getProfile(){
        setLoading(true)
        const {user}=session

        let {data,error}=await supabase
          .from('profiles')
          .select('full_name,ph_number,avatar_url')
          .eq('id',user.id)
          .single()

        if(error){
          console.warn(error)
        }else if (data){
          setUserName(data.full_name)
          setPhoneNumber(data.ph_number)
          setAvatarUrl(data.avatar_url)
        }
        setLoading(false)
      }
      getProfile()
    },[session])

    async function updateProfile(){
      const {user}=session
      const updates={
        id:user.id,
        full_name:userName,
        avatarUrl:avatarUrl,
        ph_number:phoneNumber,
        updatedAt: new Date(),
      }

      let {error}=await supabase.from('profiles').upsert(updates)

      if(error){
        console.warn(error)
      }
      setLoading(false)

    }
  
    return (
      <form onSubmit={updateProfile} className="">
        <div>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" value={session.user.email} disabled />
        </div>
        <div>
          <label htmlFor="username">Name</label>
          <input type="text" id="username" required value={userName || ""} onChange={(e)=>setUserName(e.target.value)}/>
        </div>
        <div>
          <label htmlFor="phone">Phone Number</label>
          <input type="text" name="" id="" />
        </div>
      </form>
    )
}
