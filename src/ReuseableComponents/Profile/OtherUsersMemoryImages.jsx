import { ImageList, ImageListItem } from "@mui/material";
import React, { useContext, useState } from "react";
import { ShowMemoryModel } from "./ShowMemoryModel";
import { Context as SearchContext } from "../../context/SearchContext";

export const OtherUsersMemoryImages = () => {
  const {
    state: { requestUserSearchData },
  } = useContext(SearchContext);

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
      {requestUserSearchData !== undefined &&
        requestUserSearchData?.userMemoriesDetails?.results
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
