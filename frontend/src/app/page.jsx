'use client'
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

 const Home = () => {
  const [response, setResponse] = useState(null);

  useEffect(() => {
      const socket = io("http://localhost:5000"); // Replace with your server URL

      // Listen for connection
      socket.on("connect", () => {
          console.log("Connected to WebSocket server!");

          // Emit test event
          socket.emit("testEvent", { message: "Hello, Server!" });
      });

      // Listen for server response
      socket.on("serverResponse", (data) => {
          console.log("Response from server:", data);
          setResponse(data.message);
      });

      // Clean up
      return () => socket.disconnect();
  }, []);

  return (
      <div>
          <h1>WebSocket Test</h1>
          <p>Server Response: {response || "Waiting..."}</p>
      </div>
  );
};


export default Home