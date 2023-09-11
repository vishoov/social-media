import React from "react";
import { AISideBar } from "../../../ReuseableComponents/AISideBar";
import { useSelector } from "react-redux";
import {
  Alert,
  Avatar,
  Box,
  List,
  ListItem,
  Snackbar,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  FavoriteBorderRounded,
  MoreHorizRounded,
  SendRounded,
  TvRounded,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import useMemoriesSubscribeHook from "../../../hooks/useMemoriesSubscribeHook";
import useGetMemoriesWithinAWeekHook from "../../../hooks/useGetMemoriesWithinAWeekHook";

export const SocialMediaHome = () => {
  // live memories updates
  const { snackbarMessage, snackbarOpen } = useMemoriesSubscribeHook();

  const HOME = useSelector((state) => state.home);

  // useNavigate hook
  const navigate = useNavigate();

  const handleSnackbarClose = () => {};

  useGetMemoriesWithinAWeekHook();

  return (
    <>
      <Box>
        <AISideBar />
      </Box>
      <Stack
        sx={{
          marginLeft: 45,
          paddingTop: 15,
        }}
        direction="column"
      >
        <List>
          {HOME?.HomeMemoriesContent?.map((memories) => {
            return (
              <ListItem key={memories?.urls}>
                <Stack
                  sx={{
                    marginBottom: 10,
                    border: 1,
                    borderColor: "lightblue",
                    borderRadius: 2,
                    padding: 2,
                    paddingBottom: 8,
                    width: 602,
                    height: 650,
                    maxHeight: "none",
                    overflowY: "auto",
                  }}
                >
                  <Stack
                    direction="row"
                    sx={{
                      width: 602,
                      borderBottom: 1,
                      borderBottomColor: "lightblue",
                      justifyContent: "space-between",
                    }}
                  >
                    <Stack spacing={1} direction="row" alignItems="center">
                      <Box
                        sx={{
                          paddingBottom: 0.5,
                        }}
                      >
                        {console.log("profile urls :", memories?.profileUrl)}
                        <Avatar
                          src={memories?.profileUrl}
                          srcSet={memories?.profileUrl}
                          alt="nothing"
                          sx={{
                            width: 35,
                            height: 35,
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
                          onClick={() => {
                            navigate(
                              `/environment/socialMedia/profile/username`
                            );
                          }}
                        >
                          {memories?.userName}
                        </Typography>
                      </Box>
                    </Stack>
                    <Box onClick={() => alert("not implemented yet")}>
                      <MoreHorizRounded />
                    </Box>
                  </Stack>
                  <Stack direction="row" spacing={3}>
                    <Box
                      sx={{
                        justifyContent: "start",
                      }}
                    >
                      <img
                        src={memories?.urls}
                        alt="nothing"
                        srcSet={memories?.urls}
                        style={{
                          width: 600,
                          height: 600,
                          borderRadius: 2,
                          paddingTop: 10,
                        }}
                      />
                    </Box>
                  </Stack>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{
                      paddingTop: 1,
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
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 550,
                        paddingTop: 1,
                      }}
                    >
                      JennaOrtega
                    </Typography>
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
                    <SendRounded
                      sx={{
                        height: 25,
                        width: 25,
                        cursor: "pointer",
                      }}
                    />
                  </Stack>
                </Stack>
              </ListItem>
            );
          })}
        </List>
      </Stack>
      <Box
        sx={{
          height: 200,
        }}
      >
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000} // Adjust as needed
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity="success">
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};
