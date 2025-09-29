import React, { useEffect, useState } from "react";
import { MapContainer } from "react-leaflet";
import Map from "./Map";

const Me = ({usersLocation, setIsSearchFocused }) => {

  return (
    <div  className="relative mt-0 mr-2.5 mb-2.5 ml-2.5 flex-1 bg-gray-50 h-full " onClick={()=>setIsSearchFocused(false)}>
      <Map position={usersLocation.me ? [usersLocation.me[0], usersLocation.me[1]] : null} />
      
    </div>
  );
};

export default Me;
