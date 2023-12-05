import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { config } from "../config";

interface SocketContextProps {
  children: React.ReactNode;
}

type SocketContextType = {
  socket?: Socket;
  username?: string;
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
  const [username, setUsername] = useState<string>();

  useEffect(() => {
    if (socket) return;
    const newSocket = io(config.backendUrl, { transports: ["websocket"] }); // Replace with your Socket.io server URL

    newSocket.on("username", (data) => {
      console.log("Username: ", data);
      setUsername(data.username);
    });

    newSocket.on("connect", () => {
      console.log("Connected");
      setSocket(newSocket);
    });

    return () => {
      console.log("Disconnecting socket");
      newSocket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket: socket!,
        username,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
