import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/home";
import { NotFoundPage } from "./pages/notFound";
import { Box } from "@mui/material";
import { WhiteboardPage } from "./pages/WhiteboardPage";

function App() {
  return (
    <div className="App">
      <h1>React Whiteboard</h1>
      <Box>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="whiteboard/:whiteboardId"
              element={<WhiteboardPage />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </div>
  );
}

export default App;
