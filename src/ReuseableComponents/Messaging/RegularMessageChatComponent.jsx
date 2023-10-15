import {
  Avatar,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

import React, { useState } from "react";
import { MarkChatUnreadOutlined } from "@mui/icons-material";

import { SearchModelForMessage } from "./SearchModelForMessage";
import messages from "../../static/images/utils/messages (1).png";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedConversation } from "../../redux/MessageSlice";
import { setCurrentInterface } from "../../redux/UtilitiesSlice";
import { reset_all_messages } from "../../reduxNonPersist/NonPersistMessages";
import infinity from "../../static/images/utils/status.png";

export const RegularMessageChatComponent = ({ all_conversations }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (communications, communicationData) => {
    const generatedData = {
      userName: communications?.userName,
      profilePic: communications?.profilePic?.at(0),
      conversationId: communicationData?.at(0)?.visibleConversationId,
      userId: communications?.userId,
      status: communicationData?.at(0)?.status,
    };

    dispatch(setSelectedConversation(generatedData));

    dispatch(reset_all_messages());

    navigate(
      `/environment/socialMedia/message/${generatedData?.conversationId}`
    );

    dispatch(setCurrentInterface("REGULAR_MESSAGE_CHAT"));
  };

  return (
    <>
      <Grid container>
        <Grid
          sx={{
            marginLeft: 36,
          }}
        >
          <Stack
            direction="row"
            marginLeft={4}
            spacing={45}
            alignItems="center"
          >
            <Typography
              variant="subtitle2"
              sx={{
                height: 43,
                display: "flex",
                alignItems: "center",
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Messages
            </Typography>
            <MarkChatUnreadOutlined
              onClick={() =>
                navigate("/environment/socialMedia/message/pending")
              }
              sx={{
                cursor: "pointer",
              }}
            />
          </Stack>
          <Divider
            sx={{
              marginLeft: 2,
              width: 500,
            }}
            color="lightgrey"
          />
          <List
            sx={{
              overflowY: "scroll", // Make the table body scrollable
              maxHeight: 730,
            }}
          >
            {all_conversations?.at(0)?.map((items) => {
              return (
                <ListItem
                  key={items?.userName}
                  sx={{
                    width: 520,
                  }}
                >
                  <ListItemButton
                    disableTouchRipple
                    onClick={() =>
                      handleClick(
                        items,
                        items?.conversationDetails?.filter(
                          (conversationData) =>
                            conversationData?.receiverUserId === items?.userId
                        )
                      )
                    }
                  >
                    <ListItemAvatar>
                      <Avatar
                        src={items?.profilePic?.at(0)}
                        srcSet={items?.profilePic?.at(0)}
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
                        }}
                      >
                        {items?.userName}
                      </Typography>
                      <Typography variant="caption">
                        You: {items?.userName}
                      </Typography>
                    </ListItemText>
                    <ListItemIcon>
                      <img
                        src={infinity}
                        srcSet={infinity}
                        alt="not found!"
                        style={{
                          height: 30,
                          width: 30,
                        }}
                      />
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Grid>
        <Divider
          orientation="vertical"
          color="lightgrey"
          sx={{
            height: 1040,
          }}
        />
        <Grid
          sx={{
            marginTop: 40,
            marginLeft: 45,
          }}
        >
          <div>
            <Stack direction="column" spacing={2} alignItems="center">
              <img
                src={messages}
                srcSet={messages}
                style={{
                  height: 150,
                  width: 150,
                }}
                alt="not found!"
              />
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: "bold",
                }}
              >
                Send a message to your friends and all you love.
              </Typography>
              <Button onClick={handleOpen}>send message</Button>
            </Stack>
          </div>
          <SearchModelForMessage open={open} handleClose={handleClose} />
        </Grid>
      </Grid>
    </>
  );
};
