// Whiteboard.tsx
import React, { useRef, useEffect, useState } from "react";
import { Button, Paper } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";

interface WhiteboardProps {}

type DrawingTool = "pen" | "eraser";

export const Whiteboard: React.FC<WhiteboardProps> = (
  props: WhiteboardProps,
) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentTool, setCurrentTool] = useState<DrawingTool>("pen");

  const height = 640;
  const width = 480;

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        setContext(ctx);
      }
    }
  }, [width, height]);

  const handleClear = () => {
    if (context) {
      context.clearRect(0, 0, width, height);
    }
  };

  const handleMouseDown = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  ) => {
    if (context) {
      setIsDrawing(true);
      context.beginPath();
      context.moveTo(
        e.clientX - canvasRef.current!.offsetLeft,
        e.clientY - canvasRef.current!.offsetTop,
      );
    }
  };

  const handleMouseMove = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  ) => {
    if (isDrawing && context) {
      if (currentTool === "pen") {
        context.lineTo(
          e.clientX - canvasRef.current!.offsetLeft,
          e.clientY - canvasRef.current!.offsetTop,
        );
        context.stroke();
      } else if (currentTool === "eraser") {
        // Use white color to simulate erasing
        context.strokeStyle = "#fff";
        context.lineWidth = 10;
        context.lineTo(
          e.clientX - canvasRef.current!.offsetLeft,
          e.clientY - canvasRef.current!.offsetTop,
        );
        context.stroke();
        // Reset the stroke style and line width
        context.strokeStyle = "#000";
        context.lineWidth = 2;
      }
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const switchTool = (tool: DrawingTool) => {
    setCurrentTool(tool);
  };

  return (
      <Paper elevation={3} sx={{ m: 4, p: 4, height: "80%", width: "100%" }}>
        <div style={{ marginTop: "5px" }}>
          <Button
              variant={currentTool === "pen" ? "contained" : "outlined"}
              color="primary"
              onClick={() => switchTool("pen")}
          >
            Pen
          </Button>
          <Button
              variant={currentTool === "eraser" ? "contained" : "outlined"}
              color="secondary"
              onClick={() => switchTool("eraser")}
              style={{ marginLeft: "10px" }}
              startIcon={<CreateIcon />}
          >
            Eraser
          </Button>
          <Button
              variant="contained"
              color="primary"
              onClick={handleClear}
              style={{ marginLeft: "10px" }}
          >
            Clear
          </Button>
        </div>
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{ border: "1px solid #ccc" }}
      />

    </Paper>
  );
};
