import React, { useContext, useEffect, useState } from "react";
import { AIButton } from "./AIButton";
import { MoreHorizRounded } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import AICreateMemoryModel from "./Profile/AICreateMemoryModel";
import { useDispatch, useSelector } from "react-redux";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import {
  useFollowPerson,
  useGetUserDataInProfile,
} from "../SocialMedia/APIs/SocialMediaProfileInterfaceAPI";
import { useCookies } from "react-cookie";
import { setFollowButtonChange } from "../redux/UtilitiesSlice";
import { Context as MemoryContext } from "../context/MemoryContext";
import { Context as profileContext } from "../context/ProfileContext";

export const AIUpBar = ({
  editProfile,
  shareMemory,
  settingsSuggested,
  follow,
  message,
  MoreButton,
  userName,
}) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [requestedUserData, setRequestedUserData] = useState(null);

  const { username } = useParams();

  // store variables
  const search = useSelector((state) => state.search);
  const socialMediaUser = useSelector((state) => state.socialMediaUser);
  const auth = useSelector((state) => state.auth);

  const {
    state: { memoryCount },
  } = useContext(MemoryContext);

  const {
    state: { FollowersCount, FollowingsCount },
  } = useContext(profileContext);

  useEffect(() => {}, [FollowersCount, FollowingsCount]);

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
    if (userId !== null || userId !== undefined) {
      const json = {
        data: {
          userId: search?.requestedUserSearchdata?.userId,
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
                  {FollowersCount !== null || FollowersCount !== undefined
                    ? FollowersCount
                    : 0}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                  }}
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
                  {FollowingsCount !== null || FollowingsCount !== undefined
                    ? FollowingsCount
                    : 0}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                  }}
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
                  {memoryCount !== null && memoryCount !== undefined
                    ? memoryCount
                    : 0}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
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
                  }}
                >
                  Links
                </Typography>
              </Stack>
            </p>
          </Box>
        </Stack>
        {editProfile && (
          <Box>
            <AIButton
              content="Edit Profile"
              style={{
                marginLeft: 400,
              }}
              onClick={() => navigate("/environment/socialmedia/profile/edit")}
            />
          </Box>
        )}
        {shareMemory && (
          <Box>
            <AIButton
              content="Share Memory"
              style={{
                marginLeft: 30,
              }}
              onClick={() => {
                setIsOpen(true);
              }}
            />
          </Box>
        )}
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
