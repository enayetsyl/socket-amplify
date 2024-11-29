'use client'
import { createContext, useContext } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();
const socket = io("http://localhost:5000");

export const SocketProvider = ({ children }) => (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
);

export const useSocket = () => useContext(SocketContext);
