import { useEffect, useState } from "react";
import "./App.css";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import axios from "axios";

function App() {
  const mapify_backend_url = import.meta.env.VITE_mapify_backend_url;
  
  const [userData, setUserData] = useState({
    email: localStorage.getItem("email") || "",
    username: localStorage.getItem("username") || "",
    password: localStorage.getItem("password") || "",
  });

  const [users, setUsers] = useState({
    me: [0, 0],
  });
  
  // const [loginStatus , setLoginStatus] = useState(true)

  const [loginStatus, setLoginStatus] = useState(() => {
    return localStorage.getItem("isLoggedIn") == "true";
  });

  useEffect(() => {
    if (navigator.geolocation) {
      const myWatcher = navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;

          //   console.log([latitude, longitude]);

          setUsers((prev) => {
            return { ...prev, me: [latitude, longitude] };
          });

          setUserData((prev) => {
            return {
              ...prev,
              latitude: latitude,
              longitude: longitude,
            };
          });
        },
        (error) => {
          console.log(error);
        },
        { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 }
      );
      return () => {
        navigator.geolocation.clearWatch(myWatcher);
      };
    }
  }, []);

  useEffect(() => {
    // console.log("Postiong new Location");
    // console.log(userData);
    const postingJson = {
      userData: userData,
      usersLoginDetails: {
        username: userData.username,
        email: userData.email,
        password: userData.password,
      },
    };

    
    if(!loginStatus){
      return 
    }
    axios
      .post(`${mapify_backend_url}/addselflocation`, postingJson)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userData]);


  // console.log(loginStatus)

  return (
    <div>
      {loginStatus ? (
        <Home
          userData={userData}
          users={users}
          setUsers={setUsers}
          setUserData={setUserData}
          setLoginStatus={setLoginStatus}
        />
      ) : (
        <Login
          setLoginStatus={setLoginStatus}
          userData={userData}
          setUserData={setUserData}
        />
      )}
    </div>
  );
}

export default App;
