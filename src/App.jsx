import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";

const App = () => {
  
  
  const [loginStatus, setLoginStatus] = useState(
    localStorage.getItem("loginStatus") ? true : false
  );
  const [currentUsername , setCurrentUsername] = useState(
    localStorage.getItem("currentUsername") || "Guest"
  )
  


  return (
    <Routes>
      <Route
        path="/login"
        element={
          loginStatus ? <Navigate to="/home" /> : <Login setLoginStatus={setLoginStatus} setCurrentUsername={setCurrentUsername} />
        }
      />

      <Route
        path="/home"
        element={
          loginStatus ? (
            <Home setLoginStatus={setLoginStatus} currentUsername={currentUsername}  />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route path="*" element={<Navigate to={loginStatus ? "/home" : "/login"} />} />
    </Routes>
  );
};

export default App;





// import React, { useEffect, useState } from "react";
// import Login from "./components/Login";
// import Home from "./components/Home";
// const App = () => {

//   // const [loginStatus, setLoginStatus] = useState(false);
//   const [loginStatus, setLoginStatus] = useState(
//     localStorage.getItem("loginStatus") ? true : false
//   );

//   const [usersLocation, setUsersLocation] = useState({
//     me: [40.7128, -74.006],
//   });

//   useEffect(() => {
//     if (navigator.geolocation) {
//       const myWatcher = navigator.geolocation.watchPosition(
//         (pos) => {
//           const { latitude, longitude } = pos.coords;

//           //   console.log([latitude, longitude]);

//           setUsersLocation((prev) => {
//             return { ...prev, me: [latitude, longitude] };
//           });
//         },
//         (error) => {
//           console.log(error);
//         },
//         { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 }
//       );
//       return () => {
//         navigator.geolocation.clearWatch(myWatcher);
//       };
//     }
//   }, []);


//   return (
//     <div className="">
//       {loginStatus ? (
//         <Home setLoginStatus={setLoginStatus} usersLocation={usersLocation} />
//       ) : (
//         <Login setLoginStatus={setLoginStatus} />
//       )}
//     </div>
//   );
// };

// export default App;
