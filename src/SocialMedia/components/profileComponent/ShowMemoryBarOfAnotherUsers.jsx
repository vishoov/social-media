import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Box, Typography } from "@mui/material";
import { OtherUsersMemoryImages } from "./OtherUsersMemoryImages";
import { useGetAllMemoriesForOtherUser } from "../../../SocialMedia/APIs/SocialMediaMemoryInterfaceAPI";
import { useSelector } from "react-redux";

export const ShowMemoryBarOfAnotherUsers = ({ userName }) => {
  const [cookies] = useCookies(["avt_token"]);

  const [requiredDataforRequest, setRequiredDataforRequest] = useState(null);

  const NonPersistMemories = useSelector((state) => state.NonPersistMemories);

  const NonPersistSearch = useSelector((state) => state.NonPersistSearch);

  const search = useSelector((state) => state.search);

  const { refetch } = useGetAllMemoriesForOtherUser(requiredDataforRequest);

  useEffect(() => {
    if (NonPersistMemories?.socialMediaMemoriesOfAnotherUser?.length <= 0) {
      const memoryData = {
        Authorization: cookies?.avt_token,
        userId: search?.requestedUserSearchdataForPersist?.userId,
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

    NonPersistMemories?.socialMediaMemoriesOfAnotherUser?.length,
    NonPersistSearch?.requestUserSearchData?.userPersonalDetails?.userId,

    search?.requestedUserSearchdataForPersist?.userId,
    userName,
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
          {NonPersistMemories?.socialMediaMemoriesOfAnotherUser?.length > 0 ? (
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
