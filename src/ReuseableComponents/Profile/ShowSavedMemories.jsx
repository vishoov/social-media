import { Box, Typography } from "@mui/material";
import React from "react";

export const ShowSavedMemories = () => {
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 100,
      }}
    >
      <Typography variant="body2">No Saved Memories</Typography>
    </Box>
  );
};
