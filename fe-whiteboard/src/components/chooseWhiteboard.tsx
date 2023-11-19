import React, { useState } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";

export const ChooseWhiteboard: React.FC = () => {
    const [selectedWhiteboard, setSelectedWhiteboard] = useState<number | null>(
        null
    );
    const [openDialog, setOpenDialog] = useState(false);

    const handleChooseWhiteboard = (id: number) => {
        setSelectedWhiteboard(id);
    };

    const handleDeleteWhiteboard = () => {
        // Implement your logic for deleting a whiteboard
        console.log(`Deleted whiteboard ${selectedWhiteboard}`);
        setSelectedWhiteboard(null);
        handleCloseDialog();
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <Box sx={styles.container}>
            <h2 style={styles.title}>Choose a Whiteboard</h2>
            <div style={styles.cardContainer}>
                <Box sx={styles.card}>
                    <Button
                        style={styles.button}
                        onClick={() => handleChooseWhiteboard(1)}
                    >
                        Whiteboard 1
                    </Button>
                    <Button
                        sx={styles.deleteButton}
                        onClick={() => {
                            handleChooseWhiteboard(1);
                            handleOpenDialog();
                        }}
                    >
                        Delete
                    </Button>
                </Box>
                <Box sx={styles.card}>
                    <Button
                        style={styles.button}
                        onClick={() => handleChooseWhiteboard(2)}
                    >
                        Whiteboard 2
                    </Button>
                    <Button
                        sx={styles.deleteButton}
                        onClick={() => {
                            handleChooseWhiteboard(2);
                            handleOpenDialog();
                        }}
                    >
                        Delete
                    </Button>
                </Box>
                {/* Add more buttons for additional whiteboards */}
            </div>

            {/* Confirmation Dialog */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogContent>
                    <p>Do you really want to delete this whiteboard?</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteWhiteboard} color="primary">
                        Yes, Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

const styles = {
    container: {
        textAlign: "center",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
    },
    title: {
        fontSize: "24px",
        fontWeight: "bold",
        marginBottom: "20px",
    },
    cardContainer: {
        display: "flex",
        justifyContent: "center",
    },
    card: {
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        margin: "10px",
        padding: "10px",
        position: "relative",
    },
    button: {
        padding: "10px 20px",
        fontSize: "16px",
        backgroundColor: "#3498db",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginRight: "8px",
    },
    deleteButton: {
        position: "absolute",
        top: "0px",
        right: "0px",
        padding: "5px 10px",
        fontSize: "8px",
        backgroundColor: "#e74c3c",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
};
