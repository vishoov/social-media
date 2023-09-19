import React, { useCallback, useContext, useEffect, useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { ShowMemoryModel } from "./ShowMemoryModel";
import { useGetAllMemories } from "../../SocialMedia/APIs/SocialMediaMemoryInterfaceAPI";
import { useCookies } from "react-cookie";
import { Context as MemoryContext } from "../../context/MemoryContext";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";

const PAGE_SIZE = 12; // Number of images to load per page

export const MemoryImages = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [requiredData, setRequiredData] = useState(null);

  const [cookies] = useCookies();
  const {
    state: { socialMediaMemories },
    // Assuming you have a dispatch function in your context
  } = useContext(MemoryContext);

  const memories = useSelector((state) => state.memories);

  console.log("hello another time");
  const { refetch } = useGetAllMemories(requiredData);

  const openModel = (item) => {
    setSelectedImageUrl(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImageUrl("");
    setIsModalOpen(false);
  };

  const handleScroll = (e) => {
    const target = e.target;
    const scrollTop = target.scrollTop;
    const scrollHeight = target.scrollHeight;
    const clientHeight = target.clientHeight;

    console.log(Math.ceil(scrollHeight - scrollTop) <= clientHeight);
    console.log(!loading);

    console.log(Math.ceil(scrollHeight - scrollTop));

    if (
      Math.round(scrollHeight - scrollTop) <= clientHeight &&
      !loading &&
      memories?.value?.memoryNotFoundError === null
    ) {
      // User has scrolled to the end of the ImageList.
      setLoading(true);

      const memoryData = {
        Authorization: cookies?.avt_token,
        userId: localStorage.getItem("sm_user_id"),
        pageNumber: Math.ceil(socialMediaMemories?.length / PAGE_SIZE) + 1,
      };
      setRequiredData(memoryData);
    }
  };

  const callBack = useCallback(() => {
    if (requiredData) {
      // Fetch more memories using your API and append them to socialMediaMemories
      refetch();
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    callBack();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callBack]);

  return (
    <div>
      <ImageList
        className="my-image-list" // Add a class name for targeting the ImageList
        sx={{
          width: 975,
          height: 600,
        }}
        cols={3}
        onScroll={(e) => handleScroll(e)}
        gap={1}
      >
        {socialMediaMemories !== undefined &&
          socialMediaMemories.map((images) => {
            return (
              <ImageListItem key={images?.urls}>
                <img
                  src={images?.urls}
                  srcSet={images?.urls}
                  alt="imageNotFound"
                  loading="lazy"
                  style={{
                    padding: 1,
                    width: 320,
                    height: 320,
                    cursor: "pointer",
                  }}
                  onClick={() => openModel(images)}
                />
              </ImageListItem>
            );
          })}
      </ImageList>
      {loading && <CircularProgress />}
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
