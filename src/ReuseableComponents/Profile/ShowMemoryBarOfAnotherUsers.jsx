import React, { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Box, Typography } from "@mui/material";
import { useGetUserProfileInfo } from "../../SocialMedia/APIs/SocialMediaSearchInterfaceApi";
import { OtherUsersMemoryImages } from "./OtherUsersMemoryImages";
import { Context as SearchContext } from "../../context/SearchContext";
import { useGetAllMemoriesForOtherUser } from "../../SocialMedia/APIs/SocialMediaMemoryInterfaceAPI";
import { Context as MemoryContext } from "../../context/MemoryContext";
import { useSelector } from "react-redux";

export const ShowMemoryBarOfAnotherUsers = ({ username }) => {
  const [cookies] = useCookies(["avt_token"]);

  const { mutate } = useGetUserProfileInfo();

  const [requiredDataforRequest, setRequiredDataforRequest] = useState(null);

  const {
    state: { socialMediaMemoriesOfAnotherUser },
  } = useContext(MemoryContext);

  const {
    state: { requestUserSearchData },
  } = useContext(SearchContext);

  const search = useSelector((state) => state.search);

  useEffect(() => {
    var isPresent = JSON.parse(
      JSON.parse(localStorage.getItem("persist:root"))?.search
    ).userMemoriesDetails;

    if (isPresent === null || isPresent === undefined) {
      if (username !== null || username !== undefined) {
        mutate({
          username: username,
          Authorization: cookies?.avt_token,
        });
      }
    }
  }, [cookies?.avt_token, mutate, username]);

  const { refetch } = useGetAllMemoriesForOtherUser(requiredDataforRequest);

  useEffect(() => {
    if (socialMediaMemoriesOfAnotherUser?.length <= 0) {
      const memoryData = {
        Authorization: cookies?.avt_token,
        userId:
          search?.searchData?.at(0)?.userId ||
          requestUserSearchData?.userPersonalDetails?.userId,
        pageNumber: 1,
      };

      if (requiredDataforRequest !== null) {
        refetch();
      } else {
        setRequiredDataforRequest(memoryData);
      }
    }
  }, [
    cookies?.avt_token,
    requiredDataforRequest,
    refetch,
    socialMediaMemoriesOfAnotherUser?.length,
    requestUserSearchData?.userPersonalDetails?.userId,
    search?.searchData,
  ]);

  return (
    <>
      <Box
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          {socialMediaMemoriesOfAnotherUser?.length > 0 ? (
            <Box display="flex" justifyContent="center">
              <OtherUsersMemoryImages />
            </Box>
          ) : (
            <Box
              display="flex"
              justifyContent="center"
              sx={{
                height: 632,
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  paddingTop: "200px",
                }}
              >
                memories are not available for this user
              </Typography>
            </Box>
          )}
        </div>
      </Box>
    </>
  );
};
