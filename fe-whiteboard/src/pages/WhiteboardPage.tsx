import React from "react";
import { Whiteboard } from "../components/whiteboard";
import { useParams } from "react-router-dom";
import { SocketProvider } from "../contexts/SocketContext";

export const WhiteboardPage = () => {
  const whiteboardId = useParams()["whiteboardId"];

  return (
    <SocketProvider>
      <Whiteboard whiteBoardId={whiteboardId ?? "1"} />
    </SocketProvider>
  );
};
