import { AddAPhotoRounded } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import AICreateMemoryModel from "./AICreateMemoryModel";
import { MemoryImages } from "./MemoryImages";
import { useGetAllMemories } from "../../SocialMedia/APIs/SocialMediaMemoryInterfaceAPI";
import { useCookies } from "react-cookie";
import { Context as MemoryContext } from "../../context/MemoryContext";

export const ShowMemoryBar = () => {
  const [requiredDataforRequest, setRequiredDataforRequest] = useState(null);

  const [cookies] = useCookies(["avt_token"]);

  const {
    state: { socialMediaMemories },
  } = useContext(MemoryContext);

  const { refetch } = useGetAllMemories(requiredDataforRequest);

  // const random = localStorage.getItem("random");

  useEffect(() => {
    if (
      localStorage.getItem("done") === "false" ||
      socialMediaMemories?.length <= 0
    ) {
      const memoryData = {
        Authorization: cookies?.avt_token,
        userId: localStorage.getItem("sm_user_id"),
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
    socialMediaMemories?.length,
  ]);

  return (
    <>
      <Box
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {localStorage.getItem("memoryExist") > 0 ? (
          <div>
            <Box display="flex" justifyContent="center">
              <MemoryImages />
            </Box>
          </div>
        ) : (
          <div
            style={{
              paddingTop: 490,
            }}
          >
            <Box>
              <AddAPhotoRounded
                sx={{
                  marginLeft: 71,
                }}
                fontSize="large"
              />
              <Typography
                style={{
                  marginLeft: 460,
                  fontSize: 25,
                  fontWeight: "bold",
                  color: "black",
                }}
                variant="subtitle1"
              >
                Share your memories
              </Typography>
              <Typography
                style={{
                  marginLeft: 350,
                  fontSize: 15,
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                when you share your memories, they will will appear on your
                profile.
              </Typography>
              <AICreateMemoryModel isEmpty={false} />
            </Box>
          </div>
        )}
      </Box>
    </>
  );
};
