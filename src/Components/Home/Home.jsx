import "./Home.css";
import Navbar from '../Navbar/Navbar'
import {useState} from 'react'
import Members from '../Members/Members'
import Groups from '../Groups/Groups'

import Me from "../Me/Me";
import Requests from "../Requests/Requests";
import Settings from "../Settings/Settings";

const Home = ({userData,setUserData ,setLoginStatus , users ,setUsers}) => {
    const [activeTab , setActiveTab] = useState("Settings")

      const [membersList, setMembersList] = useState([]);

  const [isSearchFocused, setIsSearchFocused] = useState(false);

  

    const tabComponents = {"Members":<Members userData={userData} setIsSearchFocused ={setIsSearchFocused} membersList={membersList} setMembersList={setMembersList} />,
    
      "Groups":<Groups setIsSearchFocused ={setIsSearchFocused}/>,
      "Me":<Me userData={userData} setUserData={setUserData} users={users} setUsers={setUsers} setIsSearchFocused ={setIsSearchFocused}/>,

      "Requests": <Requests userData={userData} setIsSearchFocused ={setIsSearchFocused}/>,

      "Settings": <Settings userData={userData} membersList={membersList} setMembersList={setMembersList} setIsSearchFocused={setIsSearchFocused} />
    
    }   

  return <div className="home-window">
    
    {/* <Sidebar/> */}

    <Navbar userData={userData} setUserData={setUserData} setLoginStatus={setLoginStatus}  activeTab={activeTab} setActiveTab={setActiveTab} isSearchFocused={isSearchFocused} setIsSearchFocused={setIsSearchFocused} />

    {tabComponents[activeTab]}

    </div>;
};

export default Home;



