import {
  FavoriteBorderRounded,
  SendRounded,
  TvRounded,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  List,
  ListItem,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useNavigateByUsingUserName from "../../../hooks/useNavigateByUsingUserName";
import useGetMemoriesWithinAWeekHook from "../../../hooks/useGetMemoriesWithinAWeekHook";

export const HomeMemoriesTab = () => {
  const NonPersistForHome = useSelector((state) => state.NonPersistForHome);

  const [username, setUsername] = useState("");

  const [isLoading, callBack] = useGetMemoriesWithinAWeekHook();

  useEffect(() => {
    callBack();
    // eslint-disable-next-line
  }, []);

  useNavigateByUsingUserName(username);

  return (
    <>
      {isLoading && (
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "75vh",
            fontSize: "1.5rem",
          }}
        >
          Loading...
        </Typography>
      )}
      <Stack
        sx={{
          marginLeft: 85,
          height: "calc(100vh - 60px)", // Calculate the remaining height for the content
          overflowY: "scroll", // Add a scroll bar if content overflows
          position: "fixed",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            width: "0.4em", // Adjust the width as needed
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "transparent", // Hide the scrollbar thumb
          },
        }}
        direction="column"
      >
        <List>
          {NonPersistForHome?.HomeMemoriesContent?.length > 0 &&
            NonPersistForHome?.HomeMemoriesContent?.map((memories) => {
              return (
                <ListItem key={memories?.urls}>
                  <Stack
                    sx={{
                      marginBottom: 5,
                    }}
                  >
                    <Stack spacing={1} direction="row" alignItems="center">
                      <Box>
                        <Avatar
                          src={memories?.profileUrl}
                          srcSet={memories?.profileUrl}
                          alt="nothing"
                          sx={{
                            width: 25,
                            height: 25,
                          }}
                        />
                      </Box>
                      <Box>
                        <Typography
                          sx={{
                            fontWeight: 550,
                            fontSize: 14,
                            color: "black",
                            cursor: "pointer",
                          }}
                          variant="inherit"
                          onClick={() => setUsername(memories?.userName)}
                        >
                          {memories?.userName}
                        </Typography>
                      </Box>
                    </Stack>

                    <Stack direction="row" spacing={3}>
                      <Box
                        sx={{
                          paddingTop: 3,
                        }}
                      >
                        <img
                          src={memories?.urls}
                          alt="nothing"
                          srcSet={memories?.urls}
                          style={{
                            width: 600,
                            height: 900,
                            borderRadius: 12,
                            cursor: "pointer",
                          }}
                        />
                      </Box>
                    </Stack>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      sx={{
                        paddingTop: 2,
                      }}
                    >
                      <Stack direction="row" spacing={3}>
                        <Box>
                          <Tooltip
                            disableFocusListener
                            title={
                              <React.Fragment>
                                <Stack
                                  spacing={2}
                                  direction="row"
                                  alignItems="center"
                                >
                                  <FavoriteBorderRounded />
                                  <Typography>424,242 likes</Typography>
                                </Stack>
                              </React.Fragment>
                            }
                          >
                            <FavoriteBorderRounded
                              sx={{
                                cursor: "pointer",
                                height: 25,
                                width: 25,
                              }}
                            />
                          </Tooltip>
                        </Box>
                        <Box>
                          <Tooltip
                            disableFocusListener
                            title={
                              <React.Fragment>
                                <Stack
                                  spacing={2}
                                  direction="row"
                                  alignItems="center"
                                >
                                  <TvRounded />
                                  <Typography>Glance</Typography>
                                </Stack>
                              </React.Fragment>
                            }
                          >
                            <TvRounded
                              sx={{
                                height: 25,
                                width: 25,
                                cursor: "pointer",
                              }}
                            />
                          </Tooltip>
                        </Box>
                      </Stack>
                    </Stack>
                    <Box>
                      {/* <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 550,
                          paddingTop: 1,
                        }}
                      >
                        {memories?.userName}
                      </Typography> */}
                      <Typography
                        sx={{
                          paddingTop: 1,
                          maxHeight: 200, // Set a maximum height for the text
                          overflowY: "auto", // Enable vertical scrolling when text exceeds maxHeight
                          fontWeight: 400, // Adjust as needed
                        }}
                      >
                        {memories?.feelings}
                      </Typography>
                    </Box>
                    <Stack
                      direction="row"
                      spacing={3}
                      sx={{
                        paddingTop: 2,
                      }}
                      alignItems="center"
                    >
                      <TextField
                        variant="standard"
                        placeholder="share your thoughts..."
                        sx={{
                          width: 550,
                        }}
                      />
                      <Box
                        sx={{
                          // backgroundColor: "rgb(55, 151, 240,1)",
                          backgroundColor: "#EEEEEE",
                          "&:hover": {
                            backgroundColor: "rgb(55, 151, 240,1)",
                          },
                          p: 1,
                          borderRadius: "50%",
                          cursor: "pointer",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <SendRounded
                          sx={{
                            height: 25,
                            width: 25,
                            cursor: "pointer",
                            color: "white",
                          }}
                        />
                      </Box>
                    </Stack>
                  </Stack>
                </ListItem>
              );
            })}
        </List>
      </Stack>
    </>
  );
};
