import React from "react";
import "./App.css";
import {Box} from "@mui/material";
import {WhiteboardPage} from "./pages/WhiteboardPage";
import {Footer} from "./components/Footer";

function App() {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "stretch",
      }}
    >
        <WhiteboardPage />
      <Footer />
    </Box>
  );
}

export default App;
