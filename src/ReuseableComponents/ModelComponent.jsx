import { Box, Container, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";

export const ModelComponent = ({ children, openCommmand }) => {
  console.log("0000000", openCommmand);
  const [open, setOpen] = useState(openCommmand);
  const [file, setFile] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (openCommmand) {
      setOpen(openCommmand);
    }
  });

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: 800,
              height: 750,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 2,
              borderRadius: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {children}
          </Box>
        </Container>
      </Modal>
    </div>
  );
};
