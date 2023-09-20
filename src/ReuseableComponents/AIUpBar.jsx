import React, { useContext, useEffect, useState } from "react";
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
}) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const {
    state: { memoryCount },
  } = useContext(MemoryContext);

  const {
    state: { FollowersCount, FollowingsCount },
  } = useContext(profileContext);

  useEffect(() => {}, [FollowersCount, FollowingsCount]);

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
    </>
  );
};
