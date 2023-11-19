import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { config } from "../config";

interface SocketContextProps {
  children: React.ReactNode;
}

type SocketContextType = {
  socket?: Socket;
};

export const SocketContext = createContext<SocketContextType | undefined>(
  undefined,
);

export const useSocket = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

export const SocketProvider: React.FC<SocketContextProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const newSocket = io(config.backendUrl, { transports: ["websocket"] }); // Replace with your Socket.io server URL

    newSocket.on("connect", () => {
      console.log("Connected");
      setSocket(newSocket);
    });

    //return () => newSocket.close();
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket: socket!,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
