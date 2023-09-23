import React, { useContext, useState } from "react";
import { AIButton } from "./AIButton";
import { MoreHorizRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import AICreateMemoryModel from "./Profile/AICreateMemoryModel";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { Context as MemoryContext } from "../context/MemoryContext";
import { Context as profileContext } from "../context/ProfileContext";

export const AIUpBar = ({
  editProfile,
  shareMemory,
  settingsSuggested,
  MoreButton,
  userName,
  onClickOfFollowingList,
  onClickOfFollowersList,
}) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const {
    state: { memoryCount },
  } = useContext(MemoryContext);

  const {
    state: { FollowersCount, FollowingsCount },
  } = useContext(profileContext);

  const handleModelClose = () => {
    setIsOpen(false);
  };

  return (
    <Stack
      sx={{
        borderBottom: 1,
        borderRadius: 2,
        borderBottomStyle: "solid",
        borderBottomColor: "lightBlue",
        width: "83.5%",
        marginLeft: "auto",
      }}
      direction="row"
      spacing={32}
    >
      <Box>
        <p
          style={{
            fontSize: 18,
          }}
        >
          <b>{userName}</b>
        </p>
      </Box>
      <Stack direction="row">
        <Stack direction="row" spacing={1} alignItems="center">
          <span
            style={{
              fontWeight: "bold",
              paddingRight: 5,
            }}
          >
            {FollowersCount !== null || FollowersCount !== undefined
              ? FollowersCount
              : 0}
          </span>
          <span
            style={{
              fontSize: "14px",
              cursor: "pointer",
            }}
            onClick={onClickOfFollowersList}
          >
            Followers
          </span>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center" marginLeft={4}>
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
              cursor: "pointer",
            }}
            onClick={onClickOfFollowingList}
          >
            Followings
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center" marginLeft={4}>
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
              cursor: "pointer",
            }}
          >
            Memories
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center" marginLeft={4}>
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
      </Stack>
      <Stack direction="row" alignItems="center">
        {editProfile && (
          <Box>
            <AIButton
              content="Edit Profile"
              style={{
                marginLeft: 150,
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
              onClick={() => {
                alert("not implemented yet");
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
    </Stack>
  );
};
