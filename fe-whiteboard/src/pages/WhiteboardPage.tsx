import { Box } from "@mui/material";
import { Whiteboard } from "../components/whiteboard";
import { useParams } from "react-router-dom";

export const WhiteboardPage = () => {
  const whiteboardId = useParams()["whiteboardId"];
  return (
    <Box>
      <div>
        <h1>Whiteboard Page - {whiteboardId}</h1>
      </div>
      <Whiteboard />
    </Box>
  );
};
