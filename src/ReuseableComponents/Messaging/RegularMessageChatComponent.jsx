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
import React, { useContext, useState } from "react";
import { VideocamRounded } from "@mui/icons-material";
import { SearchModelForMessage } from "./SearchModelForMessage";
import messages from "../../static/images/utils/messages (1).png";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedConversation } from "../../redux/MessageSlice";
import { setCurrentInterface } from "../../redux/UtilitiesSlice";
import { Context as MessageContext } from "../../context/MessageContext";

export const RegularMessageChatComponent = ({ all_conversations }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { set_sent_messages } = useContext(MessageContext);

  const handleClick = (communications, communicationData) => {
    const generatedData = {
      userName: communications?.userName,
      profilePic: communications?.profilePic.at(0),
      conversationId: communicationData?.visibleConversationId,
      userId: communications?.userId,
    };

    dispatch(setSelectedConversation(generatedData));
    set_sent_messages({ should_be_empty: true });
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
          <Typography
            variant="subtitle2"
            sx={{
              marginLeft: 2,
              height: 43,
              display: "flex",
              alignItems: "center",
              fontWeight: "bold",
            }}
          >
            Messages
          </Typography>
          <Divider
            sx={{
              marginLeft: 2,
              width: 490,
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
              return items?.map((communications) => {
                return communications?.conversationDetails
                  ?.at(0)
                  ?.map((communicationData) => {
                    return (
                      <ListItem
                        key={communications?.userName}
                        sx={{
                          width: 500,
                        }}
                      >
                        <ListItemButton
                          disableTouchRipple
                          onClick={() =>
                            handleClick(communications, communicationData)
                          }
                        >
                          <ListItemAvatar>
                            <Avatar
                              src={communications?.profilePic?.at(0)}
                              srcSet={communications?.profilePic?.at(0)}
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
                              {communications?.userName}
                            </Typography>
                            <Typography variant="caption">
                              You: {communications?.message}
                            </Typography>
                          </ListItemText>
                          <ListItemIcon>
                            <VideocamRounded />
                          </ListItemIcon>
                        </ListItemButton>
                      </ListItem>
                    );
                  });
              });
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
