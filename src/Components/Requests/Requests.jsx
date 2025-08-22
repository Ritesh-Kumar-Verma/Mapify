import React, { useEffect, useState } from "react";
import "./Requests.css";
import axios from "axios";

const Requests = ({ userData,setIsSearchFocused }) => {


      const mapify_backend_url = import.meta.env.VITE_mapify_backend_url;




  const [sentRequestsList, setSentRequestsList] = useState([]);
  const [receivedRequestList, setReceivedRequestList] = useState([]);


  const pendingRequestFromMe = ()=>{
     axios
      .post(`${mapify_backend_url}/pendingrequestsfromme`, userData)
      .then((res) => {
        setSentRequestsList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const pendingRequest= ()=>{
    
    axios
      .post(`${mapify_backend_url}/pendingrequests`, userData)
      .then((res) => {
        setReceivedRequestList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    const requestIntervalId = setInterval(()=>{
      pendingRequestFromMe()
      
      pendingRequest()

    },3000)
    return ()=>{
      clearInterval(requestIntervalId)
    }
  }, []);

  const handleAccept = (data) => {
    axios.post(`${mapify_backend_url}/acceptrequest`,userData,{params : {username : data}})
      .then((res) => {
        if(res.data === "Accepted"){
          pendingRequest()
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleReject = (data)=>{
    axios.post(`${mapify_backend_url}/rejectrequest`,userData,{params : {username : data}})
    .then(res=>{
      pendingRequest()
    })
    .catch(error=>{
      console.log(error)
    })
  }

  return (
    <div className="requests-window" onClick={()=>setIsSearchFocused(false)}>
      <div className="top">
        <div className="title">You Requested</div>
        {sentRequestsList.map((data, index) => (
          <div className="request-row" key={index}>
            <div className="requests-item">{data}</div>
            <button >Cancel</button>
          </div>
        ))}
      </div>
      <div className="bottom">
        <div className="title">Requested You</div>

        {receivedRequestList.map((data, index) => (
          <div className="request-row" key={index}>
            <div className="requests-item">{data}</div>
            <div className="button">
              <button onClick={() => handleAccept(data)}>Accept</button>
              <button onClick={()=>{handleReject(data)}}>Reject</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Requests;
