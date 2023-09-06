import React, { useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useSelector } from "react-redux";
import { ShowMemoryModel } from "./ShowMemoryModel";

export const MemoryImages = () => {
  const memories = useSelector((state) => state?.memories);

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
    <ImageList
      sx={{
        width: 1200,
        height: 600,
      }}
      cols={3}
    >
      {memories !== undefined &&
        memories?.value?.socialMediaMemories?.at(0)?.map((item) => (
          <ImageListItem key={item?.urls}>
            <img
              src={item?.urls}
              srcSet={item?.urls}
              alt="imageNotFound"
              loading="lazy"
              style={{
                marginTop: 10,
                marginLeft: 10,
                width: 390,
                height: 390,
                cursor: "pointer",
              }}
              onClick={() => openModel(item)}
            />
          </ImageListItem>
        ))}
      {isModalOpen && (
        <ShowMemoryModel
          item={selectedImageUrl}
          open={isModalOpen}
          onClose={closeModal}
          username="JennaOrtega"
          other={false}
        />
      )}
    </ImageList>
  );
};
