import {
  Avatar,
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import React, { cloneElement, useCallback, useEffect, useState } from "react";

export const AIAddMemoryContent = ({ updatedCroppedPic, upBarNext1 }) => {
  const [newUpBarNext2, setNewUpBarNext2] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  var callBackToAddFilter = useCallback(() => {
    if (upBarNext1?.props?.backArrowOnClick) {
      upBarNext1.props.backArrowOnClick();
    }
  }, [upBarNext1?.props]);

  useEffect(() => {
    const newUpBar = cloneElement(upBarNext1, {
      nextButton: true,
      backArrow: true,
      renderMessage: "Make new memory",
      backArrowOnClick: callBackToAddFilter,
    });

    if ("caches" in window) {
      caches.open("my-cache").then((cache) => {
        cache.match("/profilePics.json").then((response) => {
          if (response) {
            return response.json().then((data) => {
              const jsonData = {
                profilePicUrl: data?.profilePicUrl,
              };
              setSelectedImage(jsonData?.profilePicUrl?.[0]);
            });
          }
        });
      });
    }

    setNewUpBarNext2(newUpBar);
  }, [upBarNext1, callBackToAddFilter]);

  return (
    <>
      <div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 18,
          }}
        >
          {newUpBarNext2}
        </Box>

        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <Avatar
                  srcSet={updatedCroppedPic}
                  variant="square"
                  sx={{
                    display: "flex",
                    marginRight: 30,
                    marginTop: 5,
                    width: 300,
                    height: 300,
                    border: 1,
                    borderRadius: 4,
                  }}
                />
              </TableCell>
              <TableRow>
                <TableCell>
                  <Avatar
                    srcSet={selectedImage}
                    alt="ImageNotFound"
                    sx={{
                      marginBottom: 35,
                      width: 50,
                      height: 50,
                    }}
                  />
                </TableCell>
                <TableCell>
                  <p
                    style={{
                      marginBottom: 300,
                      fontWeight: "bold",
                    }}
                  >
                    JennaOrtega
                  </p>
                </TableCell>
              </TableRow>
              <TableCell>
                <textarea></textarea>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        {/* 
        <Stack spacing={20} direction="row">
          <Box>
            <Avatar
              srcSet={updatedCroppedPic}
              variant="square"
              sx={{
                display: "flex",
                marginTop: 5,
                width: 300,
                height: 300,
                border: 1,
                borderRadius: 4,
              }}
            />
          </Box>
          <Box>
            <Stack spacing={2} direction="row" alignItems="center">
            <Box>
              <Avatar
                srcSet={selectedImage}
                alt="ImageNotFound"
                sx={{
                  marginTop: 3,
                  width: 50,
                  height: 50,
                }}
              />
            </Box>
            <Box
              sx={{
                paddingTop: 2,
              }}
            >
              <p
                style={{
                  fontWeight: "bold",
                }}
              >
                JennaOrtega
              </p>
            </Box>
            </Stack>
          </Box>
        </Stack> */}
      </div>
    </>
  );
};
