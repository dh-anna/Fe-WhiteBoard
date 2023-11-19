import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { config } from "../config";

export const NewWhiteboard: React.FC = () => {
  const [whiteboardId, setWhiteboardId] = useState<number | null>(null);
  const [whiteboardName, setWhiteboardName] = useState<string>("");

  const handleNewWhiteboard = () => {
    fetch(`${config.backendUrl}`, {
      method: "POST",
      body: JSON.stringify({ name: whiteboardName }),
    })
      .then((response) => response.json())
      .then((data) => {
        setWhiteboardId(data.id);
      });
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWhiteboardName(event.target.value);
  };

  return (
    <Box sx={styles.container}>
      <h2 style={styles.title}>Create New Whiteboard</h2>
      <TextField
        label="Whiteboard Name"
        variant="outlined"
        value={whiteboardName}
        onChange={handleNameChange}
        sx={styles.textInput}
      />
      <Button
        style={styles.button}
        onClick={handleNewWhiteboard}
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
      >
        Create Whiteboard
      </Button>
      {whiteboardId && (
        <p style={styles.message}>
          New Whiteboard "{whiteboardName}" created with ID: {whiteboardId}
        </p>
      )}
    </Box>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  textInput: {
    width: "70%",
    marginBottom: "20px",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  message: {
    marginTop: "20px",
    color: "#27ae60",
  },
};
