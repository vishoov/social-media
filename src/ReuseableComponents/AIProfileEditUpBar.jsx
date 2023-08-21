import { Box, Button, ButtonGroup, Stack } from "@mui/material";
import React from "react";

export const AIProfileEditUpBar = () => {
  return (
    <>
      <span>
        <ButtonGroup
          variant="text"
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "start",
            width: "80%",
            marginLeft: 40,
            position: "fixed",
            top: 0,
            left: 0,
          }}
        >
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              borderBottom: 1,
              borderBottomStyle: "solid",
              borderBottomColor: "lightblue",
            }}
            spacing={70}
          >
            <Box
              sx={{
                display: "flex",
              }}
            >
              <Button>Edit Profile</Button>
            </Box>
            <Box>
              <Button>Link Tree</Button>
            </Box>
            <Box>
              <Button>Notification</Button>
            </Box>
          </Stack>
        </ButtonGroup>
      </span>
    </>
  );
};
