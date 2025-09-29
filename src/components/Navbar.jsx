import { assets } from "../assets/assets";
import React, { Children, useEffect, useState } from "react";
import axios from "axios";
import { search, sendRequest } from "../api/users";
import { toast } from "react-toastify";
import Toast from "./Toast";
import { logout } from "../api/auth";

const Navbar = ({
  currentUsername,
  activeTab,
  setLoginStatus,
  setActiveTab,
  isSearchFocused,
  setIsSearchFocused,
}) => {
  const [dropdownactive, setDropDownActive] = useState(false);

  const tabs = ["Members", "Groups", "Me", "Requests", "Settings"];

  const [navbarMenuItems, setNavbarMenuItems] = useState(tabs);
  const [hiddenItems, setHiddenItems] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [searchKeyword , setSearchKeyword] = useState("")

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
      setHiddenItems([]);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    setLoginStatus(false);
    logout();
  };

  const handleSearch = async (e) => {
   
    try {
        const res = await search(searchKeyword);
        setSearchList(res);
        
    } catch (error) {
      console.log(error);
    }

    
  };
  useEffect(()=>{
    if(searchKeyword.length>=1){
      handleSearch(searchKeyword)
    }
    if(searchKeyword.length === 0){
      setSearchList([])
    }
  },[searchKeyword])

  const handleSendRequest = async (username) => {
    try {
      const data = await sendRequest(username);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header
      className={`m-2.5 p-4 rounded-xl border border-white/20 backdrop-blur-[12px] bg-white/10 shadow-[0_0_20px_rgba(0,255,255,0.4)] text-white text-base ${
        isSearchFocused ? "z-[10000]" : ""
      } hover:shadow-[0_0_25px_rgba(0,255,255,0.7)]`}
    >
      <Toast />
      <div className="flex flex-row gap-2.5 items-center justify-between pb-2.5 border-b border-white">
        <div className="flex-1 text-white">
          Mapify
        </div>

        <div className="flex-2 flex items-center border border-gray-400 rounded-md p-[2px_0px_2px_10px] relative ">
          <img src={assets.search} alt="" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-2 bg-transparent w-[95%] border-none text-[17px] focus:outline-none"
            onFocus={() => setIsSearchFocused(true)}
            onChange={(e)=>setSearchKeyword(e.target.value.trim())}
            value={searchKeyword}
          />
          <button className="text-gray-400 font-bold hover:bg-gray-600   rounded-full mr-1 flex items-center justify-center" onClick={()=>{
            setIsSearchFocused(false)
            setSearchKeyword("")

          }} >
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
</button>

          {isSearchFocused && searchList && (
            <div className="absolute top-[105%] left-0 bg-white rounded-b-xl w-full">
              {searchList.map((data, index) => (
                <div
                  key={index}
                  className="flex justify-between border-b border-gray-400 text-black p-1.5 last:border-b-0 hover:bg-[#94b7f5]"
                >
                  <div>{data}</div>
                  <button
                    className="text-[0.7rem] px-1.5 py-0.5 border border-transparent cursor-pointer bg-gray-400 hover:border-blue-700"
                    onClick={() => handleSendRequest(data)}
                  >
                    Send Request
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex-1 flex justify-end items-center gap-1.5">
          <div className="navbar-username">{currentUsername}</div>
          <img className="h-9" src={assets.boy} alt="" />
        </div>
      </div>

      <div className="flex flex-row flex-wrap justify-between gap-2.5 mt-2.5">
        <div className="flex gap-2.5">
          {navbarMenuItems.map((data, index) => (
            <div
              key={index}
              className={`cursor-pointer ${
                activeTab === data
                  ? "text-[#7eb2d4] border-b border-blue-500"
                  : ""
              }`}
              onClick={() => setActiveTab(data)}
            >
              {data}
            </div>
          ))}

          {hiddenItems.length > 0 && (
            <div className="relative">
              <div
                className="cursor-pointer"
                onClick={() => setDropDownActive(!dropdownactive)}
              >
                {dropdownactive ? "▴" : "▾"}
              </div>
              <div className="absolute top-[120%] bg-[#3498db] rounded-md">
                {dropdownactive &&
                  hiddenItems.map((data, index) => (
                    <div
                      key={index}
                      className={`text-white border-b last:border-b-0 border-black px-1 py-1 cursor-pointer ${
                        activeTab === data
                          ? "text-[#7eb2d4] border-b border-blue-500"
                          : ""
                      }`}
                      onClick={() => {
                        setActiveTab(data);
                        setDropDownActive(false);
                      }}
                    >
                      {data}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        <button
          className="px-2.5 py-1.25 bg-red-100/10 backdrop-blur-[10px] border border-red-400/40 text-red-400 text-sm rounded-lg shadow-[0_0_10px_rgba(255,0,0,0.4)] transition-all duration-300 ease hover:bg-red-100/20 hover:shadow-[0_0_20px_rgba(255,0,0,0.8)] hover:text-white"
          onClick={handleLogout}
        >
          LogOut
        </button>
      </div>
    </header>
  );
};

export default Navbar;
