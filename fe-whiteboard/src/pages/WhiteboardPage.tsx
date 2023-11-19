import React from "react";
import { Box } from "@mui/material";
import { Whiteboard } from "../components/whiteboard";
import { useParams } from "react-router-dom";

export const WhiteboardPage = () => {
    const whiteboardId = useParams()["whiteboardId"];

    // Apply styles to the body and html elements to make the entire page not scrollable
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return (
        <Box>
            <div>
                <h4>Whiteboard Page - {whiteboardId}</h4>
            </div>
            <Whiteboard />
        </Box>
    );
};
