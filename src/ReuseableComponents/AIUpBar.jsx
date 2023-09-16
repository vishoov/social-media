import React, { useContext, useState } from "react";
import { AIButton } from "./AIButton";
import { MoreHorizRounded, SettingsSuggestRounded } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import AICreateMemoryModel from "./Profile/AICreateMemoryModel";
import { useDispatch, useSelector } from "react-redux";
import { Box, IconButton, Stack } from "@mui/material";
import {
  useFollowPerson,
  useGetUserDataInProfile,
} from "../SocialMedia/APIs/SocialMediaProfileInterfaceAPI";
import { useCookies } from "react-cookie";
import { setFollowButtonChange } from "../redux/UtilitiesSlice";
import { Context as MemoryContext } from "../context/MemoryContext";

export const AIUpBar = ({
  editProfile,
  shareMemory,
  settingsSuggested,
  follow,
  message,
  MoreButton,
  userName,
  otherUser,
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
    state: { socialMediaMemories, memoryCount },
  } = useContext(MemoryContext);

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
                marginLeft: 200,
              }}
            >
              <b>0</b> Followers
            </p>
          </Box>
          <Box>
            <p
              style={{
                marginLeft: 30,
              }}
            >
              <b>0</b> Followings
            </p>
          </Box>
          {otherUser ? (
            <Box>
              <p
                style={{
                  marginLeft: 30,
                }}
              >
                <b>{memoryCount}</b> Memories
              </p>
            </Box>
          ) : (
            <Box>
              <p
                style={{
                  marginLeft: 30,
                }}
              >
                <b>
                  {socialMediaMemories?.length
                    ? socialMediaMemories?.length
                    : 0}
                </b>{" "}
                Memories
              </p>
            </Box>
          )}
          <Box>
            <p
              style={{
                marginLeft: 30,
              }}
            >
              <b>0</b> Links
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
            <SettingsSuggestRounded
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
