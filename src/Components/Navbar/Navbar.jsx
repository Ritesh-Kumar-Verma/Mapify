import "./Navbar.css";
import { assets } from "../../assets/assets";
import React, { useState } from "react";
import axios from "axios";

const Navbar = ({
  userData,
  activeTab,
  setLoginStatus,
  setUserData,
  setActiveTab,
  isSearchFocused,
  setIsSearchFocused
}) => {
  const mapify_backend_url = import.meta.env.VITE_mapify_backend_url;

  const navbarMenuItems = ["Members", "Groups", "Me", "Requests"];

  const [membersList, setMembersList] = useState([]);

  const handleLogout = () => {
    setLoginStatus(false);
    localStorage.setItem("email", "");
    localStorage.setItem("username", "");
    localStorage.setItem("password", "");
    localStorage.setItem("isLoggedIn", false);

    setUserData({
      email: "",
      username: "",
      password: "",
      latitude: 0,
      longitude: 0,
    });
  };
  const handleSearchBoxChange = (e) => {
    e.preventDefault();
    if (e.target.value.trim() == "") {
      setMembersList([]);
      return;
    }
    axios
      .post(`${mapify_backend_url}/search`, userData, {
        params: { username: e.target.value },
      })
      .then((res) => {
        // console.log(res.data)
        setMembersList(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //to be written
  const handleSendRequest = (data) => {
    axios
      .post(`${mapify_backend_url}/sendrequest`, userData, {
        params: { username: data },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <header className={`navbar ${isSearchFocused ? "make-navbar-highest" : ""}`}>
      <div className="navbar-top">
        <div className="left-navbar">
          {/* <img src={assets.boy} alt="" /> */}
          Mapify
        </div>
        <div className="navbar-search-box">
          <img src={assets.search} alt="" />

          <input
            type="text"
            placeholder="Search..."
            onFocus={()=>setIsSearchFocused(true)}
            onChange={handleSearchBoxChange}
          />
          {isSearchFocused && membersList.length > 0 && (
            <div className="search-result">
              {membersList.map((data, index) => {
                return (
                  <React.Fragment key={index}>
                    <div className="search-result-item">
                      <div>{data}</div>
                      <button
                        className="send-request-btn"
                        onClick={() => {
                          handleSendRequest(data);
                        }}
                      >
                        Send Request
                      </button>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          )}
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
