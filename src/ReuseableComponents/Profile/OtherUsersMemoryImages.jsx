import { ImageList, ImageListItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ShowMemoryModel } from "./ShowMemoryModel";

export const OtherUsersMemoryImages = () => {
  const search = useSelector((state) => state?.search);

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

  useEffect(() => {
    console.log("search :", search);
  }, [search]);

  return (
    <ImageList
      sx={{
        width: 1200,
        height: 600,
      }}
      cols={3}
    >
      {search !== undefined &&
        search?.requestUserSearchData?.userMemoriesDetails?.results
          ?.at(0)
          ?.memory_details?.map((item) => (
            <ImageListItem key={item?.urls?.at(0)}>
              <img
                src={item?.urls?.at(0)}
                srcSet={item?.urls?.at(0)}
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
          other={true}
        />
      )}
    </ImageList>
  );
};
