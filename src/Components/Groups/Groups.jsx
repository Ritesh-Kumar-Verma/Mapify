import React from 'react'
import "./Groups.css"
const Groups = ({setIsSearchFocused}) => {
  return (
    <div className='group-window' onClick={()=>setIsSearchFocused(false)}>Coming Soon...</div>
  )
}

export default Groups