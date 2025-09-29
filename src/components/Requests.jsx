import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  acceptRequest,
  cancelRequest,
  getMyRequest,
  getPendingRequest,
  rejectRequest,
  sendRequest,
} from "../api/users";
import Loading from "./Loading";
const Requests = ({ userData, setIsSearchFocused }) => {
  const [loading, setLoading] = useState(false);
  const [sentRequestsList, setSentRequestsList] = useState([]);
  const [receivedRequestList, setReceivedRequestList] = useState([]);
  const [first , setFirst] = useState(true)

  const pendingRequestFromMe = async () => {
    try {
      setLoading(true);
      const res = await getMyRequest();
      setSentRequestsList(res);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const pendingRequest = async () => {
    try {
      setLoading(true);
      const res = await getPendingRequest();
      setReceivedRequestList(res);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelRequest = async (username) => {
    try {
      const res = await cancelRequest(username);
      pendingRequestFromMe();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    pendingRequestFromMe();

    pendingRequest();
    const requestIntervalId = setInterval(() => {
      setFirst(false)
      pendingRequestFromMe();

      pendingRequest();
    }, 3000);
    return () => {
      clearInterval(requestIntervalId);
    };
  }, []);

  const handleAccept = (username) => {
    try {
      const res = acceptRequest(username);
      pendingRequest();
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = (username) => {
    try {
      const res = rejectRequest(username);
      pendingRequest();
    } catch (error) {
      console.log(error);
    }
  };


  if(!first && sentRequestsList.length == 0 && receivedRequestList.length ==0 ){
    return (
      <div className="text-center text-cyan-300 text-4xl">
        No Request Found!!!
      </div>
    )
  }


  return (
    <div
      className="relative requests-window p-4 text-white h-full"
      onClick={() => setIsSearchFocused(false)}
    >
      <div className="absolute right-5">
        {loading && first && <Loading height={1} />}
      </div>
      <div className="top">
        <div className="title text-lg font-bold mb-2 border-b border-white">
          You Requested
        </div>
        {(sentRequestsList || []).map((data, index) => (
          <div
            key={index}
            className="request-row flex items-center justify-between bg-white/6 rounded-lg p-4 mb-2 border border-white/10"
          >
            <div className="requests-item text-base">{data}</div>
            <div className="button">
              <button
                className="btn px-4 py-2 rounded-md font-bold bg-red-600 hover:bg-red-700 shadow-lg"
                onClick={() => handleCancelRequest(data)}
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bottom mt-4">
        <div className="title text-lg font-bold mb-2 border-b border-white">
          Requested You
        </div>
        {(receivedRequestList || []).map((data, index) => (
          <div
            key={index}
            className="request-row flex items-center justify-between bg-white/6 rounded-lg p-4 mb-2 border border-white/10"
          >
            <div className="requests-item text-base">{data}</div>
            <div className="button flex gap-2">
              <button
                onClick={() => handleAccept(data)}
                className="btn px-4 py-2 rounded-md font-bold bg-green-600 hover:bg-green-700 shadow-lg"
              >
                Accept
              </button>
              <button
                onClick={() => handleReject(data)}
                className="btn px-4 py-2 rounded-md font-bold bg-red-600 hover:bg-red-700 shadow-lg"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Requests;
