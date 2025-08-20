import "./Home.css";
import Navbar from '../Navbar/Navbar'
import {useState} from 'react'
import Members from '../Members/Members'
import Groups from '../Groups/Groups'

import Me from "../Me/Me";
import Requests from "../Requests/Requests";

const Home = ({userData,setUserData ,setLoginStatus , users ,setUsers}) => {
    const [activeTab , setActiveTab] = useState("Members")
  

    const tabComponents = {"Members":<Members userData={userData} />,
    
      "Groups":<Groups/>,
      "Me":<Me userData={userData} setUserData={setUserData} users={users} setUsers={setUsers}/>,

      "Requests": <Requests userData={userData}/>
    
    }   

  return <div className="home-window">
    
    {/* <Sidebar/> */}

    <Navbar userData={userData} setUserData={setUserData} setLoginStatus={setLoginStatus}  activeTab={activeTab} setActiveTab={setActiveTab}/>

    {tabComponents[activeTab]}

    </div>;
};

export default Home;



