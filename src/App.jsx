import { useState } from 'react'
import './App.css'
import Login from './Components/Login/Login'
import Home from './Components/Home/Home'
function App() {


  //to be updated as per user
  const username = "Me"

  const [loginStatus , setLoginStatus] = useState(()=>{
    return localStorage.getItem('isLoggedIn') === "true"
  })

  // const interval = setTimeout(()=>{
  //   setLoginStatus(false)
  // },9000)

  //to view home page and to be deleted
  // localStorage.setItem('isLoggedIn',true)

  return (
    <div>
      
      {
        loginStatus ? <Home username={username}/> : <Login setLoginStatus={setLoginStatus}/>
      }
      
    </div>
  )
}

export default App
