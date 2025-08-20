import React, { useEffect, useState } from "react";
import "./Me.css";
import { MapContainer } from "react-leaflet";
import Map from "../Map/Map";
import axios from "axios";

const Me = ({ userData, setUserData, users, setUsers }) => {







  return (
    <div className="my-location-window">
      <Map position={users.me ? [users.me[0], users.me[1]] : null} />
    </div>
  );
};

export default Me;
