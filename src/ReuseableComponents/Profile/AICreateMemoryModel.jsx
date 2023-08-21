import React, { useState } from "react";
import { Box, Button, Container, Modal, Tooltip } from "@mui/material";
import { AIButton } from "../AIButton";
import { AICreateMemoryUpBar } from "./AICreateMemoryUpBar";
import { CropEasy } from "./CropEasy";

// import Demo from "../../ReuseableComponents/Profile/Demo";

export default function AICreateMemoryModel() {
  const [open, setOpen] = useState(false);
  const [firstStep, setFirstStep] = useState(false);
  const [file, setFile] = useState(null);

  // const [selectedFiles, setSelectedFiles] = useState([]);

  // const handleFilesAdded = (files) => {
  //   setSelectedFiles([...selectedFiles, ...files]);
  // };

  const handleClose = () => {
    setOpen(false);
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

  return (
    <div>
      <Tooltip
        title="Add"
        arrow
        sx={{
          marginLeft: 105,
        }}
      >
        <Button onClick={handleClickOpen}>share your first memory</Button>
      </Tooltip>
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
                  {/* <Demo onFilesAdded={handleFilesAdded} />
                  {selectedFiles.map((file, index) => (
                    <div key={index}>{file.name}</div>
                  ))} */}
                  <input
                    type="file"
                    id="image-input"
                    accept="image/*"
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
              <Box>
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
              </Box>
            )}
          </Box>
        </Container>
      </Modal>
    </div>
  );
}
