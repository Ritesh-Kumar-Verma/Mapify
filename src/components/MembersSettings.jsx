import React, { useEffect, useState } from "react";
import axios from "axios";
import { deleteMember, getFriendsList, getViewerList } from "../api/users";
import Loading from "./Loading";
const MembersSettings = ({ membersList, setMembersList }) => {
  const [loading, setLoading] = useState(false);

  const [viewersList, setViewersList] = useState([]);

  const handleGetFriendList = async () => {
    try {
            setLoading(true)
            const res = await getFriendsList();
            setLoading(false)
      setMembersList(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetViewersList = async () => {
    try {
            setLoading(true)
            const res = await getViewerList();
            setLoading(false)
      // console.log(res)
      setViewersList(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetFriendList();
    handleGetViewersList();
  }, []);

  const handleDeleteMember = async (username) => {
    try {
      setLoading(true)
      const res = await deleteMember(username);
      setLoading(false)
      handleGetFriendList();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" w-full p-4">
      {loading ? (
        <div className="h-full flex justify-center items-center">
          <Loading />
        </div>
      ) : (
        <div>
          {viewersList.length === 0 && membersList.length === 0 && (
            <div className="text-cyan-200 text-3xl">No Data Found... </div>
          )}
          <div>
            {membersList.length > 0 && (
              <div className="text-white text-2xl pb-4 ">
                You can See location of :
              </div>
            )}
            {membersList.map((data, index) => {
              return (
                <div
                  key={index}
                  className="last:border-b-1 border-white last:pb-4 "
                >
                  <div className=" text-white flex items-center justify-between bg-[rgba(255,255,255,0.06)] rounded-xl p-4 mb-1 border-[rgba(255,255,255,0.1)] ">
                    {data}

                    <button
                      className="delete-member-button bg-[rgba(245,50,69,0.8)] py-1 px-2 rounded-xl cursor-pointer transition-[background,transform,box-shadow] duration-300 ease hover:bg-[rgba(157,1,16,0.8)] hover:shadow-[rgba(220,53,69,0.8)] "
                      onClick={() => handleDeleteMember(data)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-5">
            {viewersList.length > 0 && (
              <div className="text-white text-2xl pb-4">
                Can see your location :
              </div>
            )}

            {viewersList.map((data, index) => {
              return (
                <div
                  className=" text-white flex items-center justify-between bg-[rgba(255,255,255,0.06)] rounded-xl p-4 mb-1 border-[rgba(255,255,255,0.1)] "
                  key={index}
                >
                  {data}

                  <button
                    className="delete-member-button bg-[rgba(245,50,69,0.8)] py-1 px-2 rounded-xl cursor-pointer transition-[background,transform,box-shadow] duration-300 ease hover:bg-[rgba(157,1,16,0.8)] hover:shadow-[rgba(220,53,69,0.8)] "
                    onClick={() => handleDeleteMember(data)}
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MembersSettings;
