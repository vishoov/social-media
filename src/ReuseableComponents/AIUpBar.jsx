import React, { useState } from "react";
import { AIButton } from "./AIButton";
import { MoreHorizRounded, SettingsSuggestRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import AICreateMemoryModel from "./Profile/AICreateMemoryModel";
import { useSelector } from "react-redux";
import { Box, IconButton, Stack } from "@mui/material";

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
  const [changeButtonState, setChangeButtonState] = useState("follow");

  const memories = useSelector((state) => state.memories);

  const handleModelClose = () => {
    setIsOpen(false);
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
              paddingRight: 25,
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
          <Box>
            <p
              style={{
                marginLeft: 30,
              }}
            >
              <b>{memories?.value?.socialMediaMemories?.at(0)?.length}</b>{" "}
              Memories
            </p>
          </Box>
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
            {changeButtonState ? (
              <AIButton
                content="follow"
                style={{
                  marginLeft: 480,
                }}
                onClick={() => {
                  setChangeButtonState(false);
                }}
              />
            ) : (
              <AIButton
                content="unfollow"
                style={{
                  marginLeft: 480,
                }}
                onClick={() => {
                  setChangeButtonState(true);
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
