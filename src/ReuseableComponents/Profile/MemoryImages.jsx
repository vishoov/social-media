<<<<<<< HEAD
import React, { useContext, useState } from "react";
import { ShowMemoryModel } from "./ShowMemoryModel";
import { Context as MemoryContext } from "../../context/MemoryContext";
import { Grid } from "@mui/material";
=======
import React, { useState } from "react";
import { ShowMemoryModel } from "./ShowMemoryModel";

import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
>>>>>>> defdabe (NEW)

// const PAGE_SIZE = 12; // Number of images to load per page

export const MemoryImages = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");

<<<<<<< HEAD
  const {
    state: { socialMediaMemories },
    // Assuming you have a dispatch function in your context
  } = useContext(MemoryContext);
=======
  const NonPersistMemories = useSelector((state) => state.NonPersistMemories);
>>>>>>> defdabe (NEW)

  const openModel = (item) => {
    setSelectedImageUrl(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImageUrl("");
    setIsModalOpen(false);
  };

  return (
    <div>
      <Grid
        sx={{
          width: 1000,
          paddingTop: 1,
        }}
        spacing={3}
        // paddingTop: 3,
      >
        <Grid container justifyContent="center">
<<<<<<< HEAD
          {socialMediaMemories !== undefined &&
            socialMediaMemories.map((images) => {
=======
          {NonPersistMemories?.socialMediaMemories !== undefined &&
            NonPersistMemories?.socialMediaMemories.map((images) => {
>>>>>>> defdabe (NEW)
              return (
                <img
                  src={images?.urls}
                  srcSet={images?.urls}
                  alt="imageNotFound"
                  loading="lazy"
                  style={{
                    margin: 1.5,
                    width: 320,
                    height: 320,
                  }}
                  onClick={() => openModel(images)}
                />
              );
            })}
        </Grid>
      </Grid>
      {isModalOpen && (
        <ShowMemoryModel
          item={selectedImageUrl}
          open={isModalOpen}
          onClose={closeModal}
          username="JennaOrtega"
          other={false}
        />
      )}
    </div>
  );
};
