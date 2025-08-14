import { useState } from 'react'
import './App.css'
import Login from './Components/Login/Login'
import Home from './Components/Home/Home'

function App() {

  const [userData, setUserData] = useState({
    email: localStorage.getItem("email") || "",
    username: localStorage.getItem("username") || "", 
    password: localStorage.getItem("password") || ""
  });

  

  const [users , setUsers] = useState({
    me:[0,0]
  })

  const [loginStatus , setLoginStatus] = useState(()=>{
    return localStorage.getItem('isLoggedIn') == "true"
  });
  // console.log(loginStatus)

  return (
    <div>
      {
        loginStatus
          ? <Home userData={userData} users={users} setUsers={setUsers} setUserData={setUserData} setLoginStatus={setLoginStatus}/>
          : <Login 
              setLoginStatus={setLoginStatus}  
              userData={userData}  
              setUserData={setUserData}
            />
      }
    </div>
  )
}

export default App
