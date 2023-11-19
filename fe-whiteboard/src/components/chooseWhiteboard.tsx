import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Paper,
  IconButton,
  Typography,
} from "@mui/material";
import { useGet } from "../hooks/useGet";
import { config } from "../config";
import { WhiteBoard } from "../types/WhiteBoard";
import { MdDeleteOutline } from "react-icons/md";
import { usePost } from "../hooks/usePost";

type WhiteBoardCardPros = {
  name: string;
  onOpenClick: () => void;
  onDeleteClick: () => void;
};
function WhiteBoardCard(props: WhiteBoardCardPros) {
  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Typography variant="h5" textAlign="center" p={1}>
        {props.name}
      </Typography>
      <Stack
        gap={2}
        direction="row"
        justifyContent="space-between"
        width="100%"
      >
        <Button variant="contained" onClick={props.onOpenClick}>
          Open
        </Button>
        <IconButton
          aria-label="delete"
          size="medium"
          onClick={props.onDeleteClick}
          color="error"
        >
          <MdDeleteOutline />
        </IconButton>
      </Stack>
    </Paper>
  );
}

export const ChooseWhiteboard: React.FC = () => {
  const [whiteboardToDelete, setWhiteboardToDelete] = useState<number | null>(
    null,
  );
  const [openDialog, setOpenDialog] = useState(false);

  const { data: whiteBoards, refetch: refetchBoardList } = useGet<WhiteBoard[]>(
    `${config.backendUrl}/whiteboard`,
  );

  const [deleteWhiteBoard] = usePost(`${config.backendUrl}/whiteboard/delete`);

  const handleDeleteWhiteboard = async () => {
    const bodyFormData = new FormData();
    bodyFormData.append("id", String(whiteboardToDelete));
    await deleteWhiteBoard(bodyFormData);
    console.log(`Deleted whiteboard ${whiteboardToDelete}`);
    refetchBoardList();
    setWhiteboardToDelete(null);
    handleCloseDialog();
  };

  const handleOpenDialog = (id: number) => {
    setWhiteboardToDelete(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box sx={styles.container}>
      <h2 style={styles.title}>Choose a Whiteboard</h2>
      <Stack direction="row" flexWrap="wrap" gap={2}>
        {whiteBoards?.map((whiteBoard) => (
          <WhiteBoardCard
            key={whiteBoard.id}
            name={whiteBoard.name}
            onOpenClick={() =>
              console.log("Open whiteboard with id: ", whiteBoard.id)
            }
            onDeleteClick={() => {
              handleOpenDialog(whiteBoard.id);
            }}
          />
        ))}
      </Stack>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <p>Do you really want to delete this whiteboard?</p>
        </DialogContent>
        <DialogActions>
          <Stack flexDirection="row" gap={1}>
            <Button
              onClick={handleCloseDialog}
              variant="contained"
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleDeleteWhiteboard()}
              variant="contained"
              color="error"
            >
              Yes, Delete
            </Button>
          </Stack>
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
};
