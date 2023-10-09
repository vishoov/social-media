import React from "react";
import { AddAPhotoRounded } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import AICreateMemoryModel from "./AICreateMemoryModel";
import { MemoryImages } from "./MemoryImages";
import useGetAllMemoriesHook from "../../hooks/useGetAllMemoriesHook";
<<<<<<< HEAD
=======
import { useSelector } from "react-redux";
>>>>>>> defdabe (NEW)

export const ShowMemoryBar = () => {
  // const random = localStorage.getItem("random");

<<<<<<< HEAD
=======
  const NonPersistMemories = useSelector((state) => state.NonPersistMemories);

>>>>>>> defdabe (NEW)
  useGetAllMemoriesHook(1);

  return (
    <>
      <Box
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
<<<<<<< HEAD
        {localStorage.getItem("memoryExist") > 0 ? (
=======
        {NonPersistMemories?.socialMediaMemories !== undefined ? (
>>>>>>> defdabe (NEW)
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
                  marginLeft: 63,
                }}
                fontSize="large"
              />
              <Typography
                style={{
                  marginLeft: 390,
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
                  marginLeft: 270,
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
