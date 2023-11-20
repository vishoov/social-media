import {
  Avatar,
  Box,
  Button,
  Divider,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import jen from "../../../static/images/avatar/jen.jpeg";
import {
  BookmarkBorderRounded,
  FavoriteBorderRounded,
} from "@mui/icons-material";

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
          p: 1,
          borderRadius: 2,
        }}
      >
        <Stack
          direction="row"
          sx={{
            height: 40,
            display: "flex",
            alignItems: "center",
          }}
          spacing={158}
        >
          <div
            style={{
              direction: "row",
              display: "flex",
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
          </div>
          <Stack direction="row" spacing={2}>
            <FavoriteBorderRounded
              sx={{
                cursor: "pointer",
                height: 30,
                width: 30,
              }}
            />
            <BookmarkBorderRounded
              sx={{
                cursor: "pointer",
                height: 30,
                width: 30,
              }}
            />
          </Stack>
        </Stack>
        <Divider
          sx={{
            width: "100%",
            bgcolor: "lightblue",
          }}
        />
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
                // fontWeight: 550,
                fontFamily: "sans-serif",
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
              p: 3.5,
            }}
          >
            <Stack
              direction="row"
              spacing={1}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <TextField
                placeholder="share your thoughts..."
                fullWidth
                variant="standard"
              />
              <Button
                sx={{
                  textTransform: "lowercase",
                }}
              >
                share
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Modal>
  );
};
