import React from "react";
import jen from "../../static/images/avatar/jen2.jpeg";
import space from "../../static/images/avatar/space5.jpeg";
import {
  Avatar,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
  Typography,
} from "@mui/material";
import { VideocamRounded } from "@mui/icons-material";

export const ModelForMaintainingTheConversations = ({ open, handleClose }) => {
  const dataOfCommunication = [
    {
      username: "JennaOrtega",
      url: jen,
      message: "hi om",
    },
    {
      username: "omshan0408",
      url: space,
      message: "hi jenna",
    },
  ];

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Grid
          container
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 1250,
            height: 800,
            // bgcolor: "background.paper",
            bgcolor: "transparent",
            boxShadow: 10,
            // p: 1,
            borderRadius: 2,
          }}
        >
          <Grid
            sx={{
              width: 450,
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: "bold",
                display: "flex",
                justifyContent: "center",
                color: "white",
                padding: 1,
              }}
            >
              Send a message
            </Typography>
            <Divider color="white" />
            <List
              sx={{
                overflowY: "scroll", // Make the table body scrollable
                maxHeight: 730,
              }}
            >
              {dataOfCommunication.map((communications) => {
                return (
                  <ListItem key={communications?.username}>
                    <ListItemButton
                      disableTouchRipple
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          src={communications?.url}
                          srcSet={communications?.url}
                          sx={{
                            width: 50,
                            height: 50,
                          }}
                          alt="not found!"
                        />
                      </ListItemAvatar>
                      <ListItemText>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontWeight: "bold",
                            color: "white",
                          }}
                        >
                          {communications?.username}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "white",
                          }}
                        >
                          You: {communications?.message}
                        </Typography>
                      </ListItemText>
                      <ListItemIcon>
                        <VideocamRounded htmlColor="white" />
                      </ListItemIcon>
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Grid>
          <Divider orientation="vertical" color="white" flexItem />
          <Grid
            sx={{
              width: 775,
            }}
          ></Grid>
        </Grid>
      </Modal>
    </>
  );
};
