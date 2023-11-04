import React, { useEffect, useState } from "react";
import { Box, Button, Modal, Tooltip } from "@mui/material";
import { AIButton } from "../../../ReuseableComponents/AIButton";
import { AICreateMemoryUpBar } from "./AICreateMemoryUpBar";
import { CropEasy } from "./CropEasy";

export default function AICreateMemoryModel({ isEmpty, isOpen, isClose }) {
  const [open, setOpen] = useState(false);
  const [firstStep, setFirstStep] = useState(false);
  const [file, setFile] = useState(null);

  const handleClose = () => {
    setOpen(false);
    if (isClose) {
      isClose();
    }
  };
  const handleSteps = () => {
    document.getElementById("image-input").click();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleImageChange1 = async (event) => {
    const file = event.target.files[0];

    if (file) {
      setFirstStep(true);
      setFile(file);
    }
  };

  const handleUpBarClick = () => {
    // Perform your desired tasks here when AICreateMemoryUpBar is clicked
    setFirstStep(false);
  };

  useEffect(() => {
    if (isOpen) {
      handleClickOpen();
    }
  }, [isOpen]);

  return (
    <div>
      {isEmpty ? null : (
        <Tooltip
          title="Add"
          arrow
          sx={{
            marginLeft: 50,
          }}
        >
          <Button onClick={handleClickOpen}>share your first memory</Button>
        </Tooltip>
      )}

      {open ? (
        <Modal
          open={open}
          onClose={handleClose}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
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
            {!firstStep ? (
              <>
                <AICreateMemoryUpBar
                  justifyContent="center"
                  renderMessage="Make new memory"
                />
                <Box
                  sx={{
                    marginTop: 45,
                  }}
                >
                  <input
                    type="file"
                    id="image-input"
                    accept="image/jpeg"
                    style={{ display: "none" }}
                    onChange={handleImageChange1}
                  />
                  <AIButton
                    content="select from your device"
                    onClick={handleSteps}
                  />
                </Box>
              </>
            ) : (
              <CropEasy
                uploadedFile={file}
                upBar={
                  <AICreateMemoryUpBar
                    justifyContent="space-between"
                    backArrow={false}
                    nextButton={false}
                    renderMessage=""
                    backArrowOnClick={handleUpBarClick}
                    visibility="hidden"
                  />
                }
              />
            )}
          </Box>
        </Modal>
      ) : null}
    </div>
  );
}
