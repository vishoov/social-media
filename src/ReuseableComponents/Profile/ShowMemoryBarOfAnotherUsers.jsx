import React, { useContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Box, Typography } from "@mui/material";
import { useGetUserProfileInfo } from "../../SocialMedia/APIs/SocialMediaSearchInterfaceApi";
import { OtherUsersMemoryImages } from "./OtherUsersMemoryImages";
import { Context as SearchContext } from "../../context/SearchContext";

export const ShowMemoryBarOfAnotherUsers = ({ username }) => {
  const [cookies] = useCookies(["avt_token"]);

  const { mutate } = useGetUserProfileInfo();

  const {
    state: { requestUserSearchData },
  } = useContext(SearchContext);

  useEffect(() => {
    console.log("hello:::::");
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

  return (
    <>
      <Box
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          {requestUserSearchData?.userMemoriesDetails !== undefined ? (
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
