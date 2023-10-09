import { Grid } from "@mui/material";

import React, { useState } from "react";
import { ShowMemoryModel } from "./ShowMemoryModel";
import { useSelector } from "react-redux";

export const OtherUsersMemoryImages = () => {
  const NonPersistMemories = useSelector((state) => state.NonPersistMemories);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");

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
      >
        <Grid container justifyContent="center">
          {NonPersistMemories?.socialMediaMemoriesOfAnotherUser !== undefined &&
            NonPersistMemories?.socialMediaMemoriesOfAnotherUser.map(
              (images) => {
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
              }
            )}
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
