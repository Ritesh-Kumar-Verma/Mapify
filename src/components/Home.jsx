import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import Members from "./Members";
import Me from "./Me";
import Requests from "./Requests";
import Settings from "./Settings";
import { addSelfLocation } from "../api/users";

const Home = ({ setLoginStatus, currentUsername  }) => {
  
      const [usersLocation, setUsersLocation] = useState({
    me: [40.7128, -74.006],
  });
  
  useEffect(() => {
    addSelfLocation(usersLocation.me);
  },[usersLocation])
  
  useEffect(() => {
    if (navigator.geolocation) {
      const myWatcher = navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setUsersLocation((prev) => ({ ...prev, me: [latitude, longitude] }));
        },
        (error) => console.log(error),
        { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 }
      );
      return () => navigator.geolocation.clearWatch(myWatcher);
    }
  }, []);

  const [activeTab, setActiveTab] = useState("Requests");

  const [membersList, setMembersList] = useState([]);

  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const tabComponents = {
    Members: (
      <Members
        setIsSearchFocused={setIsSearchFocused}
        membersList={membersList}
        setMembersList={setMembersList}
      />
    ),

    // "Groups":<Groups setIsSearchFocused ={setIsSearchFocused}/>,
    Me: (
      <Me
        usersLocation={usersLocation}
        setIsSearchFocused={setIsSearchFocused}
      />
    ),

    Requests: <Requests setIsSearchFocused={setIsSearchFocused} />,

    Settings: (
      <Settings
        membersList={membersList}
        setMembersList={setMembersList}
        setIsSearchFocused={setIsSearchFocused}
      />
    ),
  };

  return (
    <div className="flex flex-col h-screen w-full ">
      <Navbar
      currentUsername = {currentUsername}
        setLoginStatus={setLoginStatus}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isSearchFocused={isSearchFocused}
        setIsSearchFocused={setIsSearchFocused}
      />

      {tabComponents[activeTab]}
    </div>
  );
};

export default Home;
