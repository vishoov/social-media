import React, { useEffect, useState } from "react";

import { AIButton } from "./AIButton";
import { MoreHorizRounded } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import AICreateMemoryModel from "../SocialMedia/components/profileComponent/AICreateMemoryModel";
import { useDispatch, useSelector } from "react-redux";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import {
  useFollowPerson,
  useGetUserDataInProfile,
} from "../SocialMedia/APIs/SocialMediaProfileInterfaceAPI";
import { useCookies } from "react-cookie";
import { setFollowButtonChange } from "../redux/UtilitiesSlice";

export const AIAnotherUserUpBar = ({
  settingsSuggested,
  follow,
  message,
  MoreButton,
  userName,
  onClickOfFollowingList,
  onClickOfFollowersList,
}) => {
  //   const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [requestedUserData, setRequestedUserData] = useState(null);

  const { username } = useParams();

  // store variables
  const search = useSelector((state) => state.search);
  const socialMediaUser = useSelector((state) => state.socialMediaUser);
  const auth = useSelector((state) => state.auth);

  const NonPersistMemories = useSelector((state) => state.NonPersistMemories);

  const NonPersistProfile = useSelector((state) => state.NonPersistProfile);

  useEffect(() => {}, [
    NonPersistProfile?.FollowersCount,
    NonPersistProfile?.FollowingsCount,
  ]);

  // useCookies hook
  const [cookies] = useCookies(["avt_token"]);

  const dispatch = useDispatch();

  var userId =
    localStorage.getItem("sm_user_id") ||
    socialMediaUser?.value?.SocialMediaUserData?.userId ||
    auth?.value?.userDetails?.userId;

  const handleModelClose = () => {
    setIsOpen(false);
  };

  const { refetch } = useGetUserDataInProfile(requestedUserData);

  const { mutate } = useFollowPerson();

  const followHandler = () => {
    if (userId && search?.requestedUserSearchdataForPersist?.userId) {
      console.log("No userId or search data1");
      const json = {
        data: {
          userId: search?.requestedUserSearchdataForPersist?.userId,
          followerId: parseInt(userId),
        },
        Authorization: cookies?.avt_token,
      };
      mutate(json);
    } else {
      if (requestedUserData === null) {
        setRequestedUserData(username || userName);
      } else {
        refetch();
      }
    }
  };

  return (
    <>
      <Stack
        sx={{
          borderBottom: 1,
          borderRadius: 2,
          borderBottomStyle: "solid",
          borderBottomColor: "lightBlue",
          width: "83.5%",
          marginLeft: "auto",
          alignItems: "center",
        }}
        direction="row"
      >
        <Box>
          <p
            style={{
              textAlign: "start",
              fontSize: 18,
              color: "black",
              paddingRight: 23,
            }}
          >
            <b>{userName}</b>
          </p>
        </Box>
        <Stack direction="row">
          <Box>
            <p
              style={{
                marginLeft: 225,
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  {NonPersistProfile?.FollowersCount !== null ||
                  NonPersistProfile?.FollowersCount !== undefined
                    ? NonPersistProfile?.FollowersCount
                    : 0}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                  onClick={onClickOfFollowersList}
                >
                  Followers
                </Typography>
              </Stack>
            </p>
          </Box>
          <Box>
            <p
              style={{
                marginLeft: 30,
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  {NonPersistProfile?.FollowingsCount !== null ||
                  NonPersistProfile?.FollowingsCount !== undefined
                    ? NonPersistProfile?.FollowingsCount
                    : 0}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                  onClick={onClickOfFollowingList}
                >
                  Followings
                </Typography>
              </Stack>
            </p>
          </Box>
          <Box>
            <p
              style={{
                marginLeft: 30,
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  {NonPersistMemories?.memoryCount !== null &&
                  NonPersistMemories?.memoryCount !== undefined
                    ? NonPersistMemories?.memoryCount
                    : 0}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                >
                  Memories
                </Typography>
              </Stack>
            </p>
          </Box>
          <Box>
            <p
              style={{
                marginLeft: 30,
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  0
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                >
                  Links
                </Typography>
              </Stack>
            </p>
          </Box>
        </Stack>

        {settingsSuggested && (
          <Box>
            <MoreHorizRounded
              style={{
                marginLeft: 30,
              }}
            />
          </Box>
        )}

        {follow && (
          <Box>
            {search?.isFollowing ? (
              <AIButton
                content="Following"
                style={{
                  marginLeft: 480,
                }}
                onClick={() => {
                  dispatch(setFollowButtonChange(true));
                }}
              />
            ) : (
              <AIButton
                content="follow"
                style={{
                  marginLeft: 480,
                }}
                onClick={() => {
                  followHandler();
                }}
              />
            )}
          </Box>
        )}
        {message && (
          <Box>
            <AIButton
              content="message"
              style={{
                marginLeft: 30,
              }}
            />
          </Box>
        )}
        <Box>
          <AICreateMemoryModel
            isEmpty={true}
            isOpen={isOpen}
            isClose={handleModelClose}
          />
        </Box>
        {MoreButton && (
          <Box
            sx={{
              marginLeft: 2,
            }}
          >
            <IconButton
              onClick={() => {
                alert("Not implemented yet");
              }}
            >
              <MoreHorizRounded />
            </IconButton>
          </Box>
        )}
      </Stack>
    </>
  );
};
