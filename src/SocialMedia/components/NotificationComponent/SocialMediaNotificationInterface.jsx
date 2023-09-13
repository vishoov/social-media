import React from "react";
import { AISideBar } from "../../../ReuseableComponents/AISideBar";
import { Avatar, Box, List, ListItem, Stack, Typography } from "@mui/material";
import jen18 from "../../../static/images/avatar/jen18.jpeg";
import useMemoriesSubscribeHook from "../../../hooks/useMemoriesSubscribeHook";
import { useSelector } from "react-redux";

export const SocialMediaNotificationInterface = () => {
  useMemoriesSubscribeHook();

  const NOTIFICATION = useSelector((state) => state.notification);

  const getTime = (created) => {
    const nowTimestamp = Date.now();

    const timeDifference = Math.abs(nowTimestamp - parseInt(created));

    var time = `${Math.floor(timeDifference / 3600000)} hr ago`; // 1 hour = 3600000 milliseconds

    if (Math.floor(timeDifference / 3600000) < 1) {
      time = `${Math.floor((timeDifference % 3600000) / 60000)} minutes ago`; // 1 minute = 60000 milliseconds
    }
    return time;
  };

  return (
    <>
      <Box>
        <AISideBar />
      </Box>
      {/*  upbar stack */}
      <Stack
        sx={{
          borderBottom: 1,
          borderRadius: 2,
          borderBottomStyle: "solid",
          borderBottomColor: "lightBlue",
          width: "83.5%",
          marginLeft: "auto",
          height: 40,
          alignItems: "center",
        }}
        direction="row"
      >
        <Box>
          <Stack direction="row" spacing={1} alignItems="center">
            <Avatar
              src={jen18}
              srcSet={jen18}
              alt="no image found!!!"
              sx={{
                width: 30,
                height: 30,
              }}
            />
            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
              }}
            >
              JennaOrtega
            </Typography>
          </Stack>
        </Box>
      </Stack>
      {/* below upbar stack */}
      <Stack direction="row">
        <Stack
          direction="column"
          spacing={2}
          sx={{
            marginTop: 5,
            marginLeft: 40,
          }}
        >
          <List>
            {NOTIFICATION?.memoriesNotification?.map((data) => {
              return (
                <ListItem key={data?.profileUrl}>
                  <Box
                    sx={{
                      paddingTop: 3,
                    }}
                  >
                    <Stack
                      sx={{
                        border: "1px solid lightBlue",
                        borderRadius: "8px", // Add rounded corners
                        padding: "8px", // Add some padding for spacing
                        width: "auto",
                        maxWidth: 600, // Set a maximum width
                        wordWrap: "break-word", // Wrap long words to the next line
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                      direction="row"
                    >
                      {/* most inner stack */}
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Avatar
                          alt="Natacha"
                          srcSet={data?.profileUrl}
                          src={data?.profileUrl}
                        />
                        <Box>
                          <Typography
                            variant="body2"
                            sx={{
                              marginRight: 5,
                            }}
                          >
                            {data?.userName} just shared a memory
                          </Typography>
                        </Box>
                      </Stack>
                      <Typography variant="caption">
                        {getTime(data?.created)}
                      </Typography>
                    </Stack>
                  </Box>
                </ListItem>
              );
            })}
          </List>
        </Stack>
      </Stack>
    </>
  );
};
