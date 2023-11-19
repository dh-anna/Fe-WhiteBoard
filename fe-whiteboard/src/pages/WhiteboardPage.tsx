import React from "react";
import { Box } from "@mui/material";
import { Whiteboard } from "../components/whiteboard";
import { useParams } from "react-router-dom";
import { SocketProvider } from "../contexts/SocketContext";

export const WhiteboardPage = () => {
  const whiteboardId = useParams()["whiteboardId"];
  return (
    <SocketProvider>
      <Whiteboard whiteBoardId={whiteboardId} />
    </SocketProvider>
  );
};
