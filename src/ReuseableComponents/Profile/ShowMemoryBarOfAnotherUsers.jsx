import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useGetAllMemories } from "../../SocialMedia/APIs/SocialMediaMemoryInterfaceAPI";
import { useSelector } from "react-redux";
import { MemoryImages } from "./MemoryImages";
import { Box } from "@mui/material";

export const ShowMemoryBarOfAnotherUsers = ({ userIdofRequested }) => {
  const [requiredDataforRequest, setRequiredDataforRequest] = useState(null);

  const [cookies] = useCookies(["avt_token"]);

  const { refetch } = useGetAllMemories(requiredDataforRequest);

  const memories = useSelector((state) => state.memories);

  useEffect(() => {
    var isPresent = JSON.parse(
      JSON.parse(localStorage.getItem("persist:root"))?.memories
    ).value?.socialMediaAnotherUserMemories;

    if (isPresent?.length <= 0) {
      const memoryData = {
        Authorization: cookies?.avt_token,
        userId: userIdofRequested,
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
    memories?.value?.socialMediaMemories?.length,
    userIdofRequested,
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
          <Box display="flex" justifyContent="center">
            <MemoryImages />
          </Box>
        </div>
      </Box>
    </>
  );
};
