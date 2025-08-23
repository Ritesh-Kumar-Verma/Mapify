import React, { useState } from 'react'
import "./Settings.css"
import MembersSettings from "../MembersSettings/MembersSettings"
import PasswordSettings from "../PasswordSettings/PasswordSettings"

const Settings = ({membersList , setMembersList, userData , setIsSearchFocused}) => {
  const settingsTab = ["Members","Password"]
  const [activeSettingsTab , setActiveSettingsTab] = useState("Members")
  
  const settingTabComponent = {
    "Members" : <MembersSettings membersList={membersList} setMembersList={setMembersList} userData={userData} />,
    "Password" : <PasswordSettings/>
  }
  
  return (
    <div className='setting-window' onClick={()=>setIsSearchFocused(false)}>
      <div className="settings-sidebar">
        {
          settingsTab.map((data, index)=>{
            return (
              <div className={`settings-item ${data == activeSettingsTab ? 'active-member':''}`} key={index} onClick={()=>setActiveSettingsTab(data)} >
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