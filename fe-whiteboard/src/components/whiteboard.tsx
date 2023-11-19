// Whiteboard.tsx
import React, { useRef, useEffect, useState } from 'react';
import { Button, Paper } from '@mui/material';

interface WhiteboardProps {
    width: number;
    height: number;
}

const Whiteboard: React.FC<WhiteboardProps> = ({ width, height }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext('2d');
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

    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        if (context) {
            setIsDrawing(true);
            context.beginPath();
            context.moveTo(e.clientX - canvasRef.current!.offsetLeft, e.clientY - canvasRef.current!.offsetTop);
        }
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        if (isDrawing && context) {
            context.lineTo(e.clientX - canvasRef.current!.offsetLeft, e.clientY - canvasRef.current!.offsetTop);
            context.stroke();
        }
    };

    const handleMouseUp = () => {
        setIsDrawing(false);
    };

    return (
        <Paper elevation={3} style={{ margin: '20px', padding: '10px' }}>
            <canvas
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                style={{ border: '1px solid #ccc' }}
            />
            <Button variant="contained" color="primary" onClick={handleClear} style={{ marginTop: '10px' }}>
                Clear
            </Button>
        </Paper>
    );
};

export default Whiteboard;
