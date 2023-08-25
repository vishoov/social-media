import { ArrowBackRounded } from "@mui/icons-material";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import React from "react";

export const AICreateMemoryUpBar = ({
  backArrow,
  justifyContent,
  nextButton,
  backArrowOnClick,
  shareButtonOnClick,
  nextButtonOnClick,
  renderMessage,
  shareVisibility,
  nextVisibility,
  ShareButton,
}) => {
  return (
    <Stack
      sx={{
        borderBottom: 1,
        borderRadius: 3,
        borderBottomStyle: "solid",
        borderBottomColor: "lightBlue",
        width: 837,
        display: "flex",
        justifyContent: justifyContent,
        alignItems: "center",
        position: "fixed",
      }}
      direction="row"
      spacing={35}
    >
      {backArrow ? (
        <Box>
          <IconButton onClick={backArrowOnClick}>
            <ArrowBackRounded />
          </IconButton>
        </Box>
      ) : null}
      <Box>
        <Typography
          sx={{
            fontWeight: 550,
            marginBottom: 1,
            marginLeft: 2,
          }}
        >
          {renderMessage}
        </Typography>
      </Box>
      {nextButton ? (
        <Box
          sx={{
            visibility: nextVisibility,
          }}
        >
          <Button variant="text" onClick={nextButtonOnClick}>
            Next
          </Button>
        </Box>
      ) : null}
      {ShareButton ? (
        <Box
          sx={{
            visibility: shareVisibility,
          }}
        >
          <Button variant="text" onClick={shareButtonOnClick}>
            Share
          </Button>
        </Box>
      ) : null}
    </Stack>
  );
};
