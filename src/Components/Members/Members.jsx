import React, { useEffect, useState } from "react";
import "./Members.css";
import Map from "../Map/Map";
import axios from "axios";
const Members = ({ userData, setIsSearchFocused,membersList , setMembersList }) => {
      const mapify_backend_url = import.meta.env.VITE_mapify_backend_url;




  const [activeMember, setActiveMember] = useState(null);


  const [memberPos, setMemberPos] = useState([]);

  useEffect(() => {
    axios
      .post(`${mapify_backend_url}/getmemberslist`, userData)
      .then((res) => {
        console.log(res.data);

        setMembersList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getLocations = (username) => {
    axios
      .post(`${mapify_backend_url}/getlocation`, userData, {
        params: {
          username: username,
        },
      })
      .then((res) => {
        console.log(res.data);
        setMemberPos(res.data);
      })
      .catch((error) => {
        console.log(error.data);
      });
  };


  useEffect(() => {
    if (membersList.length >= 1 && !activeMember) {
      setActiveMember(membersList[0]);
    }
  }, [membersList]);



useEffect(() => {
  let intervalId; 

  if (activeMember) {
    intervalId = setInterval(() => {
      getLocations(activeMember);
    }, 3000);
  }

  return () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
  };
}, [activeMember]);





  return (
    <div className="members-window" onClick={()=>setIsSearchFocused(false)}>
      <div className="members-list">
        {membersList.map((data, index) => {
          return (
            <div
              className={`member ${
                activeMember === data ? "active-member" : ""
              }`}
              key={index}
              onClick={() => setActiveMember(data)}
            >
              {data}
            </div>
          );
        })}
      </div>
      <div className="member-map-info">
        {memberPos.length>0 && <Map position={memberPos} />}
      </div>
    </div>
  );
};

export default Members;
