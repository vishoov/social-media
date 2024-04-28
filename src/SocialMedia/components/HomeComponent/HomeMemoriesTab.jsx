import {
  FavoriteBorderRounded,
  FavoriteRounded,
  SendRounded,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
<<<<<<< HEAD
  
=======
>>>>>>> a5458831a434594ea3dd2605bba2d4ab77282be8
  List,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useNavigateByUsingUserName from "../../../hooks/useNavigateByUsingUserName";
import useGetMemoriesWithinAWeekHook from "../../../hooks/useGetMemoriesWithinAWeekHook";
import useAddMemoryLikeHook from "../../../hooks/useAddMemoryLikeHook";
<<<<<<< HEAD
import "./Memories.css"
=======

>>>>>>> a5458831a434594ea3dd2605bba2d4ab77282be8
export const HomeMemoriesTab = () => {
  const NonPersistForHome = useSelector((state) => state.NonPersistForHome);

  const [username, setUsername] = useState("");

  const [isLoading, callBack] = useGetMemoriesWithinAWeekHook();

  useEffect(() => {
    if (NonPersistForHome?.HomeMemoriesContent?.length === 0) {
      callBack();
    }
    // eslint-disable-next-line
  }, []);

  useNavigateByUsingUserName(username);

  const { handleLikeClick, likedStates } = useAddMemoryLikeHook();

  return (
    <>
<<<<<<< HEAD
  


   
  {isLoading && (
  <div className="gradient-bar"></div>
)}

      

      <Stack
        direction="column"
        className="stackContainer"
=======
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
>>>>>>> a5458831a434594ea3dd2605bba2d4ab77282be8
      >
        <List>
          {NonPersistForHome?.HomeMemoriesContent?.length > 0 &&
            NonPersistForHome?.HomeMemoriesContent?.map((memories, index) => {
              return (
                <ListItem key={index}>
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
<<<<<<< HEAD
                            width: 40,
                            height: 40,
=======
                            width: 25,
                            height: 25,
>>>>>>> a5458831a434594ea3dd2605bba2d4ab77282be8
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
<<<<<<< HEAD
                       className="imgContainer"
                        sx={{
                          paddingTop: 1,
                        }}
                      >
                        <img 
                       
                          src={memories?.urls}
                          alt="nothing"
                          srcSet={memories?.urls}
                         
=======
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
>>>>>>> a5458831a434594ea3dd2605bba2d4ab77282be8
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
                      <Box>
                        <Stack direction="row" spacing={2}>
                          {likedStates[index] ||
                          (memories?.isLiked[0] &&
                            memories?.likerUserIds?.includes(
                              parseInt(localStorage.getItem("sm_user_id"))
                            )) ? (
                            <FavoriteRounded
                              sx={{
                                color: "#FF4B91",
                                height: 25,
                                width: 25,
                                cursor: "pointer",
                              }}
                              onClick={() => handleLikeClick(memories, index)}
                            />
                          ) : (
                            <FavoriteBorderRounded
                              sx={{
                                cursor: "pointer",
                                height: 25,
                                width: 25,
                                transition:
                                  "background-color 0.3s ease-in-out, color 0.3s ease-in-out",
                                borderRadius: "100%",
                                // Add a custom CSS style to change the background color of the heart icon
                              }}
                              onClick={() => handleLikeClick(memories, index)}
                            />
                          )}
                          <Typography
                            sx={{
                              fontFamily: "sans-serif",
                            }}
                          >
                            {memories?.totalLikes ? memories?.totalLikes : 0}{" "}
                            likes
                          </Typography>
                        </Stack>
                      </Box>
                    </Stack>
                    <Box>
                      {/* <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 550,
                          paddingTop: 1,
                          fontFamily: "sans-serif",
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
                          fontFamily: "sans-serif",
                        }}
                      >
                        {memories?.feelings}
                      </Typography>
                    </Box>
                    <Stack
                      direction="row"
<<<<<<< HEAD
                      spacing={1}
                      sx={{
                        paddingTop: 1.5,
=======
                      spacing={2}
                      sx={{
                        paddingTop: 2,
>>>>>>> a5458831a434594ea3dd2605bba2d4ab77282be8
                      }}
                      alignItems="center"
                    >
                      <TextField
                        variant="standard"
<<<<<<< HEAD
                        placeholder="Share your thoughts..."
                        className="textfield"
=======
                        placeholder="share your thoughts..."
                        sx={{
                          width: 550,
                        }}
>>>>>>> a5458831a434594ea3dd2605bba2d4ab77282be8
                      />
                      <Box
                        sx={{
                          backgroundColor: "rgb(55, 151, 240,1)",
<<<<<<< HEAD
                          p: 0.8,
=======
                          p: 1,
>>>>>>> a5458831a434594ea3dd2605bba2d4ab77282be8
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
