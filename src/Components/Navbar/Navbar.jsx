import "./Navbar.css";
import { assets } from "../../assets/assets";
import React, { useState } from "react";
import axios from "axios";

const Navbar = ({ userData, activeTab,setLoginStatus , setUserData, setActiveTab }) => {
  const navbarMenuItems = ["Members", "Groups", "Me"];

  const [membersList , setMembersList] = useState([])

  const handleLogout = () => {
    setLoginStatus(false)
    localStorage.setItem("email" , "")
    localStorage.setItem("username","")
    localStorage.setItem("password","")
    localStorage.setItem("isLoggedIn",false)

    setUserData({
      email: "",
      username: "",
      password: "",
      latitude: 0,
      longitude: 0,
    });
  };
  const handleSearchBoxChange = (e)=>{
    e.preventDefault()
    if(e.target.value.trim() == ''){
      setMembersList([])
      return
    }
    axios.post("http://localhost:8080/search",userData,{params : {username : e.target.value}})
    .then(res=>{
      // console.log(res.data)
      setMembersList(res.data)
    })
    .catch(error=>{
      console.log(error)
    })
  }


  //to be written
  const handleSendRequest=(data)=>{

    axios.post("http://localhost:8080/sendrequest",userData,{params : {username : data}})
    .then(res=>{
      console.log(res.data)
    })
    .catch(error=>{
      console.log(error)
    })


  }
  

  return (
    <header className="navbar">
      <div className="navbar-top">
        <div className="left-navbar">
          {/* <img src={assets.boy} alt="" /> */}
        </div>
        <div className="navbar-search-box">
          <img src={assets.search} alt="" />

          <input type="text" placeholder="Search..." onChange={handleSearchBoxChange} />
          <div className="search-result">
            {membersList.map((data,index)=>{
              return(
                
                <React.Fragment key={index}>
                  <div className="search-result-item">
                    <div>{data}</div>
                    <button className="send-request-btn" onClick={()=>{handleSendRequest(data)}}>Send Request</button>
                  </div>
                </React.Fragment>
              )
            })}
          </div>
        </div>
        <div className="right-navbar">
          <div className="navbar-username">{userData.username}</div>
          <img src={assets.boy} alt="" />
        </div>
      </div>

      <div className="navbar-menu-items">
        <div className="left-menu-item">
          {navbarMenuItems.map((data, index) => {
            return (
              <div
                className={`navbar-item ${activeTab === data ? "active" : ""}`}
                key={index}
                onClick={() => {
                  setActiveTab(data);
                }}
              >
                {data}
              </div>
            );
          })}
        </div>
        <button className="logout-button" onClick={handleLogout}>
          LogOut
        </button>
      </div>
    </header>
  );
};

export default Navbar;
