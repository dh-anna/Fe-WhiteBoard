import React, { useEffect, useRef, useState } from "react";
import { Box, Paper, Stack } from "@mui/material";
import { ToolSelector } from "./toolSelector";
import { useSocket } from "../contexts/SocketContext";

interface WhiteboardProps {
  whiteBoardId?: string;
}

export type DrawingTool = "pen" | "eraser";

export const Whiteboard: React.FC<WhiteboardProps> = (
  props: WhiteboardProps,
) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentTool, setCurrentTool] = useState<DrawingTool>("pen");

  const { socket } = useSocket();

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        setContext(ctx);
      }

      // Function to update canvas size
      const updateCanvasSize = () => {
        const parent = canvasRef.current?.parentElement;
        setCanvasSize({
          width: parent?.clientWidth || 0,
          height: parent?.clientHeight || 0,
        });
      };

      // Initial setup
      updateCanvasSize();

      // Event listener for window resize
      window.addEventListener("resize", updateCanvasSize);

      // Cleanup the event listener on component unmount
      return () => {
        window.removeEventListener("resize", updateCanvasSize);
      };
    }
  }, []);

  const handleClear = () => {
    if (context) {
      context.clearRect(0, 0, canvasSize.width, canvasSize.height);
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

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvasRef.current?.getContext("2d");

    if (!canvas || !context || !canvasRef.current) return;
    // Update canvas size
    canvasRef.current.width = canvasSize.width;
    canvasRef.current.height = canvasSize.height;
  }, [canvasSize]); // Run this effect whenever canvasSize changes

  return (
    <Box sx={{ flexGrow: 1, m: 2, p: 2, display: "flex" }}>
      <Stack alignItems="center" gap={2} sx={{ width: "100%" }}>
        <ToolSelector
          currentTool={currentTool}
          onPenSelect={() => switchTool("pen")}
          onEraserSelect={() => switchTool("eraser")}
          onClearPage={handleClear}
        />
        <Paper
          elevation={2}
          sx={{ width: "100%", height: "calc(100vh - 180px)" }}
        >
          <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          />
        </Paper>
      </Stack>
    </Box>
  );
};
