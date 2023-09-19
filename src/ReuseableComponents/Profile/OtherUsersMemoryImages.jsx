import { CircularProgress, ImageList, ImageListItem } from "@mui/material";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { ShowMemoryModel } from "./ShowMemoryModel";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { useGetAllMemoriesForOtherUser } from "../../SocialMedia/APIs/SocialMediaMemoryInterfaceAPI";
import { Context as MemoryContext } from "../../context/MemoryContext";
import { Context as SearchContext } from "../../context/SearchContext";

const PAGE_SIZE = 12;

export const OtherUsersMemoryImages = () => {
  const {
    state: { requestUserSearchData },
  } = useContext(SearchContext);

  const {
    state: { socialMediaMemoriesOfAnotherUser },
  } = useContext(MemoryContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [requiredData, setRequiredData] = useState(null);

  const [cookies] = useCookies();

  const search = useSelector((state) => state.search);
  const memory = useSelector((state) => state.memories);

  const { refetch, isLoading } = useGetAllMemoriesForOtherUser(requiredData);

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

    if (Math.round(scrollHeight - scrollTop) <= clientHeight && !loading) {
      // User has scrolled to the end of the ImageList.
      setLoading(true);

      const memoryData = {
        Authorization: cookies?.avt_token,
        userId:
          search?.requestedUserSearchdataForPersist?.userId ||
          requestUserSearchData?.userPersonalDetails?.userId,
        pageNumber:
          Math.ceil(socialMediaMemoriesOfAnotherUser?.length / PAGE_SIZE) + 1,
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

    // eslint-disable-next-line no-unused-expressions
  }, [requiredData]);

  useEffect(() => {
    callBack();
  }, []);

  return (
    <ImageList
      sx={{
        width: 975,
        height: 600,
      }}
      cols={3}
      onScroll={(e) => handleScroll(e)}
    >
      {memory?.value?.MemoryNotFoundForOtherUserError === null &&
        socialMediaMemoriesOfAnotherUser?.map((item) => (
          <ImageListItem key={item?.urls}>
            <img
              src={item?.urls}
              srcSet={item?.urls}
              alt="imageNotFound"
              loading="lazy"
              style={{
                padding: 1,
                width: 320,
                height: 320,
                cursor: "pointer",
              }}
              onClick={() => openModel(item)}
            />
          </ImageListItem>
        ))}
      {isLoading && <CircularProgress />}
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
