import React, { useEffect, useState } from "react";
import "./Me.css";
import { MapContainer } from "react-leaflet";
import Map from "../Map/Map";
import axios from "axios";

const Me = ({ userData, setUserData, users, setUsers }) => {

    const mapify_backend_url = import.meta.env.VITE_mapify_backend_url;





  useEffect(() => {
    if (navigator.geolocation) {
      const myWatcher = navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;

          //   console.log([latitude, longitude]);

          setUsers((prev) => {
            return { ...prev, me: [latitude, longitude] };
          });

          setUserData((prev) => {
            return {
              ...prev,
              latitude: latitude,
              longitude: longitude,
            };
          });
        },
        (error) => {
          console.log(error);
        },
        { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 }
      );
      return () => {
        navigator.geolocation.clearWatch(myWatcher);
      };
    }
  }, []);

  useEffect(() => {
    // console.log("Postiong new Location");
    // console.log(userData);
    const postingJson = {
      userData: userData,
      usersLoginDetails: {
        username: userData.username,
        email: userData.email,
        password: userData.password,
      },
    };

    // console.log(postingJson);

    axios
      .post(`${mapify_backend_url}/addselflocation`, postingJson)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userData]);

  return (
    <div className="my-location-window">
      <Map position={users.me ? [users.me[0], users.me[1]] : null} />
    </div>
  );
};

export default Me;
