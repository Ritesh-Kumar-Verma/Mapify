import React, { useEffect, useState } from "react";
import Map from "./Map";
import Loading from "./Loading";
import { getFriendsList, getLocation } from "../api/users";
const Members = ({
  userData,
  setIsSearchFocused,
  membersList,
  setMembersList,
}) => {
  const [loading, setLoading] = useState(false);

  const [activeMember, setActiveMember] = useState(null);

  const [memberPos, setMemberPos] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        const res = await getFriendsList();
        // console.log(res);
        setMembersList(res);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  useEffect(() => {
    if (membersList.length >= 1 && !activeMember) {
      setActiveMember(membersList[0]);
    }
  }, [membersList]);

  const fetchLocation = async (username) => {
    const location = await getLocation(username);
    setMemberPos([location.latitude, location.longitude]);
  };

  useEffect(() => {
    let intervalId;

    if (activeMember) {
      intervalId = setInterval(() => {
        fetchLocation(activeMember);
      }, 3000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [activeMember]);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loading height={2} />
      </div>
    );
  }

  return (
    <div className="flex-1 flex" onClick={() => setIsSearchFocused(false)}>
      {!loading && activeMember === null && (
        <div className="w-full text-cyan-300 text-4xl text-center">
          No Members Found!
        </div>
      )}
      <div className="members-list flex flex-col gap-3 ">
        {membersList.map((data, index) => {
          return (
            <div
              className={`p-4 text-white cursor-pointer bg-[rgb(35,161,235)] ${
                activeMember === data
                  ? " bg-[rgb(54,170,247)] rounded-r-xl "
                  : ""
              }`}
              key={index}
              onClick={() => setActiveMember(data)}
            >
              {data}
            </div>
          );
        })}
      </div>
      <div className="flex-1 mt-0 mb-4 mx-4 ">
        {memberPos.length > 0 && <Map position={memberPos} />}
      </div>
    </div>
  );
};

export default Members;
