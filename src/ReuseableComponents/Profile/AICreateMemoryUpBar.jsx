import { ArrowBackRounded } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";

export const AICreateMemoryUpBar = ({
  backArrow,
  justifyContent,
  nextButton,
  backArrowOnClick,
  nextButtonOnClick,
  renderMessage,
  visibility,
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
          <ArrowBackRounded onClick={backArrowOnClick} />
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
            visibility: { visibility },
          }}
        >
          <Button variant="text" onClick={nextButtonOnClick}>
            Next
          </Button>
        </Box>
      ) : null}
    </Stack>
  );
};
