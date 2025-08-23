import React, { useEffect } from "react";
import "./MembersSetting.css";
import axios from "axios";

const MembersSettings = ({ userData, membersList, setMembersList }) => {
  const mapify_backend_url = import.meta.env.VITE_mapify_backend_url;

  const getMembersList=()=>{
    
    axios.post(`${mapify_backend_url}/getmemberslist`,userData)
    .then(res=>{
      setMembersList(res.data)
    })
    .catch(error=>{
      console.log(error)
    })
  }

  useEffect(() => {
    getMembersList()
  }, []);
  const handleDeleteMember = (data)=>{
    axios.delete(`${mapify_backend_url}/deletemember`,{
      data : userData,
      params : {username :data}
    })
    .then(res=>{
      console.log(res.data)
      getMembersList()
    })
    .catch(error=>console.log(error))

  }

  return (
    <div className="members-setting-tab">
      {membersList.map((data, index) => {
        return (
          <div className="member-setting-item" key={index}>
            {data}
            <div className="delete-member-button">
              <button onClick={()=>handleDeleteMember(data)}>Delete</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MembersSettings;
