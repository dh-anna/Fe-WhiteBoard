import React, { useEffect, useRef, useState } from "react";
import { Box, Paper, Stack } from "@mui/material";
import { ToolSelector } from "./toolSelector";

interface WhiteboardProps {}

export type DrawingTool = "pen" | "eraser";

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
    <Paper elevation={3} sx={{ flexGrow: 1, m: 2, p: 2 }}>
      <Stack alignItems="center" gap={2}>
        <ToolSelector
          currentTool={currentTool}
          onPenSelect={() => switchTool("pen")}
          onEraserSelect={() => switchTool("eraser")}
          onClearPage={handleClear}
        />
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          style={{ border: "1px solid #ccc" }}
        />
      </Stack>
    </Paper>
  );
};
