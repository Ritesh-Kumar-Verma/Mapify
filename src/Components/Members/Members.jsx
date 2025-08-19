import React, { useEffect, useState } from "react";
import "./Members.css";
import Map from "../Map/Map";
import axios from "axios";
const Members = ({ userData }) => {
  const [activeMember, setActiveMember] = useState(null);

  const [membersList, setMembersList] = useState([]);

  const [memberPos, setMemberPos] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:8080/getmemberslist", userData)
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
      .post("http://localhost:8080/getlocation", userData, {
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
    if(activeMember)
    getLocations(activeMember);
  }, [activeMember]);




  return (
    <div className="members-window">
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
