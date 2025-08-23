import "./Navbar.css";
import { assets } from "../../assets/assets";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Navbar = ({
  userData,
  activeTab,
  setLoginStatus,
  setUserData,
  setActiveTab,
  isSearchFocused,
  setIsSearchFocused,
}) => {
  const mapify_backend_url = import.meta.env.VITE_mapify_backend_url;

  const [dropdownactive , setDropDownActive] = useState(false)

  const tabs = ["Members", "Groups", "Me", "Requests", "Settings"];

  const [navbarMenuItems, setNavbarMenuItems] = useState(tabs);
  const [hiddenItems, setHiddenItems] = useState([]);

  const handleResize = () => {

    const wid = window.innerWidth / window.devicePixelRatio;

    if (window.innerWidth <= 400) {
      setNavbarMenuItems(tabs.slice(0, 3));
      setHiddenItems(tabs.slice(3));
    } else if (window.innerWidth <= 440) {
      setNavbarMenuItems(tabs.slice(0, 4));
      setHiddenItems(tabs.slice(4));
    } else {
      setNavbarMenuItems(tabs);
      setHiddenItems([])
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);

  const [searchList, setSearchList] = useState([]);

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
      setSearchList([]);
      return;
    }
    axios
      .post(`${mapify_backend_url}/search`, userData, {
        params: { username: e.target.value },
      })
      .then((res) => {
        // console.log(res.data)
        setSearchList(res.data);
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
    <header
      className={`navbar ${isSearchFocused ? "make-navbar-highest" : ""}`}
    >
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
            onFocus={() => setIsSearchFocused(true)}
            onChange={handleSearchBoxChange}
          />
          {isSearchFocused && searchList.length > 0 && (
            <div className="search-result">
              {searchList.map((data, index) => {
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
              {}
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

          {hiddenItems.length > 0 && (
            <div className="dropdown-menu">
              <div className="up-down" onClick={()=>{
                setDropDownActive(dropdownactive?false:true)
            }}>{dropdownactive ?'▴':'▾' } </div>
              <div className="dropdown-menu-items">
                {dropdownactive && hiddenItems.map((data, index) => {
                  return (
                    <div
                      key={index}
                      className={`dropdown-item ${
                        activeTab === data? "active" : ""
                      }`}
                      onClick={() =>
                        {
                          setActiveTab(data)
                          setDropDownActive(false)
                        } }
                    >
                      {data}
                    </div>
                  );
                })}
              </div>
            </div>

          )}


        </div>

        <button className="logout-button" onClick={handleLogout}>
          LogOut
        </button>
      </div>
    </header>
  );
};

export default Navbar;
