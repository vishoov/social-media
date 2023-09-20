import {
  Avatar,
  Box,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import jen from "../../static/images/avatar/jen.jpeg";
import { MoreHorizRounded } from "@mui/icons-material";

export const ShowMemoryModel = ({ open, onClose, item, username, other }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 1500,
          height: 900,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 1,
          borderRadius: 2,
        }}
      >
        <Stack
          sx={{
            borderBottom: 1,
            borderRadius: 2,
            borderBottomStyle: "solid",
            borderBottomColor: "lightBlue",
            width: 1500,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          direction="row"
        >
          <Stack
            direction="row"
            sx={{
              alignItems: "center",
            }}
          >
            <Avatar
              srcSet={jen}
              alt="ImageNotFound"
              sx={{
                width: 35,
                height: 35,
              }}
            />
            <Typography
              sx={{
                fontWeight: 550,
                marginBottom: 1,
                justifyContent: "start",
                marginLeft: 2,
              }}
            >
              {username}
            </Typography>
          </Stack>
          <MoreHorizRounded
            onClick={() => {
              alert("Not implemented yet");
            }}
          />
        </Stack>
        <Stack
          sx={{
            alignItems: "end",
          }}
        >
          {other ? (
            <img
              srcSet={item?.urls}
              alt="imageNotFound"
              style={{
                width: 865,
                height: 865,
              }}
            />
          ) : (
            <img
              srcSet={item?.urls}
              alt="imageNotFound"
              style={{
                width: 865,
                height: 865,
              }}
            />
          )}
          <Box>
            <Typography
              sx={{
                position: "absolute",
                top: 30,
                left: 0,
                p: 3,
                width: 595,
                marginTop: 4,
                maxHeight: "none",
                overflowY: "auto",
                fontWeight: 550,
                height: 140,
              }}
            >
              {item?.feelings}
            </Typography>
          </Box>
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: 590,
              p: 3,
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <TextField label="Share your thoughts..." fullWidth />
              <Typography onClick={() => alert("not implemented yet...")}>
                Share
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Modal>
  );
};
