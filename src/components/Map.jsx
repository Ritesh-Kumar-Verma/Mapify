import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const Map = ({ position }) => {
  const [fullScreen, setFullScreen] = useState(false);

  const handleFullScreen = () => setFullScreen(!fullScreen);

  const customIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
    iconSize: [32, 32],
  });

  const RecenterMap = ({ position }) => {
    const map = useMap();
    useEffect(() => {
      if (position) map.setView(position, map.getZoom(), { animate: true });
    }, [position, map]);
    return null;
  };

  const RecenterButton = ({ position }) => {
    const map = useMap();
    const handleRecenter = () => {
      if (position) map.setView(position, map.getMaxZoom() , { animate: true });
    };
    return (
      <button
        onClick={handleRecenter}
        className="absolute bottom-4 right-4 z-[100001] px-3 py-2 bg-gray-700 text-white rounded shadow hover:bg-gray-900"
      >
        Recenter
      </button>
    );
  };

  return (
    <div
      className={`h-full ${
        fullScreen
          ? "fixed top-0 left-0 w-screen h-screen z-[99999]" 
          : "w-full h-96" 
      }`}
    >

      <button
        className="absolute top-2 right-2 z-[11] px-3 py-1 bg-gray-700 bg-opacity-60 text-white rounded hover:bg-gray-900"
        onClick={handleFullScreen}
      >
        {fullScreen ? "🗗" : "⛶"}
      </button>

      {position && (
        <MapContainer
          center={position}
          zoom={18}
          className="w-full h-full"
          style={{zIndex:10}}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={position} icon={customIcon}>
            <Popup>You are here!</Popup>
          </Marker>
          <RecenterMap position={position} />
          <RecenterButton position={position} />
        </MapContainer>
      )}
    </div>
  );
};

export default Map;
