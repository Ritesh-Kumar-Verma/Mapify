import React, { useEffect, useState } from "react";
import "./Requests.css";
import axios from "axios";

const Requests = ({ userData }) => {
  const [sentRequestsList, setSentRequestsList] = useState([]);
  const [receivedRequestList, setReceivedRequestList] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:8080/pendingrequestsfromme", userData)
      .then((res) => {
        setSentRequestsList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .post("http://localhost:8080/pendingrequests", userData)
      .then((res) => {
        setReceivedRequestList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="requests-window">
      <div className="top">
        <div className="title">You Requested</div>
        {sentRequestsList.map((data, index) => (
          <div className="request-row" key={index}>
            <div className="requests-item">{data}</div>
            <button>Cancel</button>
          </div>
        ))}
      </div>
      <div className="bottom">
        <div className="title">Requested You</div>

        {receivedRequestList.map((data, index) => (
          <div className="request-row" key={index}>
            <div className="requests-item">{data}</div>
            <div className="button">
              <button>Accept</button>
              <button>Reject</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Requests;
