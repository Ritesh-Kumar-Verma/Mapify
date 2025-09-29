import React, { useEffect, useState } from 'react'
import Toast from "./Toast"
import { toast } from 'react-toastify'
import { changePassword } from '../api/auth'
const PasswordSettings = () => {
  
  const [password, setResetPassword] = useState({
    currentPassword : "",
    newPassword : "",
    reTypeNewPassword : ""
  })
  const onChange = (e)=>{
    
    setResetPassword(prev=>({
      ...prev,
      [e.target.name] : e.target.value
    }))

  }

  

  const handlePasswordReset =async (e)=>{
    e.preventDefault()
   
    if(password.newPassword !== password.reTypeNewPassword){
      toast.error("Retype Password donot match")
    }
    else if(password.currentPassword === password.newPassword){
      toast.error("Current password and new password cannot be same")
    }
    else{
      const res = await changePassword(password)
      if(res === "Success"){
        toast.success("Successfully Changed password")
      }
    }

  }
  
  return (
    <div className='flex  w-full items-center justify-center' >
      
      <form className='flex flex-col gap-3 border-2 border-white rounded-2xl p-4 ' onSubmit={(e)=>handlePasswordReset(e)} >
        <input type="password" onChange={onChange} name='currentPassword' placeholder='Enter Current Password' className='p-2 rounded w-50 bg-white   '/>
        <input type="password" onChange={onChange} name='newPassword' placeholder='Enter new Password'  className='p-2 rounded w-50 bg-white   '/>
        <input type="password" onChange={onChange} name='reTypeNewPassword' placeholder='Retype new Password' className='p-2 rounded w-50 bg-white   '/>
        <button className='p-2 rounded w-50 bg-green-400' >Reset Passord</button>
      </form>
      <Toast/>
    </div>
  )
}

export default PasswordSettings