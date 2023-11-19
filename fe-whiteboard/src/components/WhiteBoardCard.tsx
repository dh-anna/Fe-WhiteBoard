import { Button, IconButton, Paper, Stack, Typography } from "@mui/material";
import { MdDeleteOutline } from "react-icons/md";
import React from "react";

type WhiteBoardCardPros = {
  name: string;
  onOpenClick: () => void;
  onDeleteClick: () => void;
};

export const WhiteBoardCard = (props: WhiteBoardCardPros) => (
  <Paper elevation={2} sx={{ p: 2 }}>
    <Typography variant="h5" textAlign="center" p={1}>
      {props.name}
    </Typography>
    <Stack gap={2} direction="row" justifyContent="space-between" width="100%">
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
