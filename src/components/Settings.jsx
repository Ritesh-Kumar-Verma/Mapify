import React, { useState } from 'react'
import MembersSettings from "./MembersSettings"
import PasswordSettings from "./PasswordSettings"

const Settings = ({membersList , setMembersList, userData , setIsSearchFocused}) => {
  const settingsTab = ["Members","Password"]
  const [activeSettingsTab , setActiveSettingsTab] = useState("Members")
  
  const settingTabComponent = {
    "Members" : <MembersSettings membersList={membersList} setMembersList={setMembersList} userData={userData} />,
    "Password" : <PasswordSettings/>
  }
  
  return (
    <div className=' flex h-full' onClick={()=>setIsSearchFocused(false)}>
      <div className=" flex flex-col w-fit gap-2 border-r-1 border-white h-full">
        {
          settingsTab.map((data, index)=>{
            return (
              <div className={`cursor-pointer p-4 text-white ${data == activeSettingsTab ? ' bg-[rgb(6,87,141)] rounded-r-xl':''}`} key={index} onClick={()=>setActiveSettingsTab(data)} >
                {data}
              </div>
            )
          })
        }
      </div>

      {
        settingTabComponent[activeSettingsTab]
      }


      </div>
  )
}

export default Settings


