import { Button, Stack } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import React from "react";
import { DrawingTool } from "./whiteboard";

export const ToolSelector = (props: {
  currentTool: DrawingTool;
  onPenSelect: () => void;
  onEraserSelect: () => void;
  onClearPage: () => void;
}) => (
  <Stack direction="row" gap={1}>
    <Button
      variant={props.currentTool === "pen" ? "contained" : "outlined"}
      color="primary"
      onClick={props.onPenSelect}
    >
      Pen
    </Button>
    <Button
      variant={props.currentTool === "eraser" ? "contained" : "outlined"}
      color="secondary"
      onClick={props.onEraserSelect}
      style={{ marginLeft: "10px" }}
      startIcon={<CreateIcon />}
    >
      Eraser
    </Button>
    <Button
      variant="contained"
      color="primary"
      onClick={props.onClearPage}
      style={{ marginLeft: "10px" }}
    >
      Clear
    </Button>
  </Stack>
);
