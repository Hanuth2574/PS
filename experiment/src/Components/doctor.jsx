// src/App.js
import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://localhost:5000';

const App = () => {
  const [location, setLocation] = useState({ lat: null, lng: null });

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    
    // Emit location updates
    const sendLocation = () => {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        socket.emit('locationUpdate', { lat: latitude, lng: longitude });
        console.log("Hllo");
      });
    };

    // Set interval to send location updates every 5 seconds
    const intervalId = setInterval(sendLocation, 5000);

    // Receive location updates
    socket.on('locationUpdate', (newLocation) => {
        console.log("workld");
      setLocation(newLocation);
    });

    return () => {
      clearInterval(intervalId);
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Live Location Tracker</h1>
      <p>Latitude: {location.lat}</p>
      <p>Longitude: {location.lng}</p>
    </div>
  );
};

export default App;
