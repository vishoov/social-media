import React, { useState } from "react";
import { SearchModelForMessage } from "./SearchModelForMessage";
import { Button, Stack, Typography } from "@mui/material";
import message from "../../static/images/utils/messages (1).png";

export const FirstTimeChatComponent = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div
        style={{
          height: 900,
          width: 2000,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack direction="column" spacing={2} alignItems="center">
          <img
            src={message}
            srcSet={message}
            style={{
              height: 150,
              width: 150,
            }}
            alt="not found!"
          />
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: "bold",
            }}
          >
            Send a message to your friends and all you love.
          </Typography>
          <Button onClick={handleOpen}>send message</Button>
        </Stack>
      </div>
      <SearchModelForMessage open={open} handleClose={handleClose} />
    </>
  );
};
