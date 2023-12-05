import React, { useEffect, useRef, useState } from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { ToolSelector } from "./toolSelector";
import { useSocket } from "../contexts/SocketContext";

interface WhiteboardProps {
  whiteBoardId: string;
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

  const { socket, username } = useSocket();

  useEffect(() => {
    if (!socket) return;
    socket.on("message", (data) => {
      console.log(data);
    });
    socket.emit("connect_to_whiteboard", {
      whiteboard_id: props.whiteBoardId,
    });
    socket.on("draw", (data) => {
      if (!context) return;
      if (data.username === username) return;

      if (data.type === "erase") {
        context.strokeStyle = "#fff";
        context.lineWidth = 10;
      } else {
        context.strokeStyle = "#000";
        context.lineWidth = 2;
      }

      if (data.type === "clear") {
        context.clearRect(0, 0, canvasSize.width, canvasSize.height);
        return;
      }
      if (data.type === "start") {
        context.beginPath();
        context.moveTo(data.cords.x, data.cords.y);
        return;
      }
      if (data.type === "draw" || data.type === "erase") {
        context.lineTo(data.cords.x, data.cords.y);
        context.stroke();
        return;
      }
      if (data.type === "stop") {
        context.closePath();
        return;
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

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
    }
  }, []);

  const emitDrawEvent = (type: string, cords?: { x: number; y: number }) => {
    socket?.emit("draw", {
      type,
      cords,
      whiteboard_id: props.whiteBoardId,
      username,
    });
  };

  const handleClear = () => {
    if (context) {
      context.clearRect(0, 0, canvasSize.width, canvasSize.height);
    }
    emitDrawEvent("clear");
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
      emitDrawEvent("start", {
        x: e.clientX - canvasRef.current!.offsetLeft,
        y: e.clientY - canvasRef.current!.offsetTop,
      });
    }
  };

  const handleMouseMove = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  ) => {
    if (isDrawing && context) {
      const cords = {
        x: e.clientX - canvasRef.current!.offsetLeft,
        y: e.clientY - canvasRef.current!.offsetTop,
      };

      if (currentTool === "pen") {
        context.lineTo(cords.x, cords.y);
        context.stroke();
        emitDrawEvent("draw", cords);
      } else if (currentTool === "eraser") {
        context.strokeStyle = "#fff";
        context.lineWidth = 10;
        context.lineTo(cords.x, cords.y);
        context.stroke();
        context.strokeStyle = "#000";
        context.lineWidth = 2;
        emitDrawEvent("erase", cords);
      }
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    context?.closePath();
    emitDrawEvent("stop");
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
        <Stack flexDirection="row" justifyContent="space-between" width="100%">
          <Typography variant="h5">Name: {username ?? "-"}</Typography>
          <ToolSelector
            currentTool={currentTool}
            onPenSelect={() => switchTool("pen")}
            onEraserSelect={() => switchTool("eraser")}
            onClearPage={handleClear}
          />
        </Stack>
        <Paper
          elevation={2}
          sx={{
            width: "100%",
            height: "calc(100vh - 180px)",
            overflow: "hidden",
          }}
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
