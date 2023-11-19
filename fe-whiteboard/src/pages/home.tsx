import React from "react";
import { NewWhiteboard } from "../components/newWhiteboard";
import { ChooseWhiteboard } from "../components/chooseWhiteboard";
import { Box, Paper, Stack, Typography } from "@mui/material";

export const HomePage: React.FC = () => {
  return (
    <Stack flexGrow={1} alignItems="center" p={2}>
      <Paper elevation={2} sx={{ flexGrow: 1, width: "100%" }}>
        <Stack direction="column" gap={3} m={2}>
          <Typography variant="h3" textAlign="center">
            Whiteboard App
          </Typography>
          <NewWhiteboard />
          <ChooseWhiteboard />
        </Stack>
      </Paper>
    </Stack>
  );
};
