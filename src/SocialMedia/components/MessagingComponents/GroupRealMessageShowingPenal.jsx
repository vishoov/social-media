import { ContentCopyRounded, DeleteOutlineRounded } from "@mui/icons-material";
import {
  Avatar,
  Menu,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import useReceiveGroupMessageHook from "../../../hooks/useReceiveGroupMessageHook";
import { useParams } from "react-router-dom";
import useGetDeletedGroupMessageConfirmationHook from "../../../hooks/useGetDeleteGroupMessageConfirmationHook";

const socketForSendMessage = new SockJS("http://localhost:9988/websocket");

// Create a Stomp client over the SockJS WebSocket connection
const stompClientForSendMessage = Stomp.over(socketForSendMessage);

const style = {
  recieverMessageStyle: {
    margin: 1.5,
    border: "white",
    borderRadius: "20px",
    backgroundColor: "rgb(238, 238, 238)",
    padding: 1.3, // Adjust padding as needed
    width: "auto", // This allows the width to expand with content
    display: "inline-block",
    maxWidth: 800,
    cursor: "pointer",
  },
  senderMessageStyle: {
    margin: 1.5,
    border: "white",
    borderRadius: "20px",
    backgroundColor: "rgb(55, 151, 240,1)",
    color: "white",
    padding: 1.3, // Adjust padding as needed
    width: "auto", // This allows the width to expand with content
    display: "inline-block",
    maxWidth: 800, // This allows the width to expand with content
    cursor: "pointer",
  },
};

export const GroupRealMessageShowingPenal = () => {
  const { groupConversationId } = useParams();

  const message = useSelector((state) => state.message);

  const MessageNonPersist = useSelector((state) => state.NonPersistMessage);

  const { callBack } = useReceiveGroupMessageHook(
    message,
    groupConversationId,
    MessageNonPersist?.all_group_messages
  );

  const scrollRef = useRef(null);

  const newCallBackForRenderingMessages = useCallback(() => {
    callBack();
    // eslint-disable-next-line
  }, []);

  // receive messages from the server
  useEffect(() => {
    newCallBackForRenderingMessages();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Scroll to the most recent message when new messages arrive
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [MessageNonPersist]);

  useEffect(() => {
    // Save the index of the most recent message in local storage
    if (MessageNonPersist?.all_group_messages) {
      localStorage.setItem(
        "mostRecentMessageIndex",
        MessageNonPersist.all_group_messages.length - 1
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [MessageNonPersist]);

  useEffect(() => {
    // Restore the scroll position to the most recent message on component mount
    const mostRecentMessageIndex = localStorage.getItem(
      "mostRecentMessageIndex"
    );
    if (mostRecentMessageIndex && scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // handle click for edit or delete message
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClickForMessage = (event) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteEvent = (messageId) => {
    console.log("messageId :", messageId);

    stompClientForSendMessage.send(
      `/conversation/group/delete/message/${messageId}`,
      {},
      JSON.stringify({
        primaryKeys: {
          messageId: messageId,
          userId: parseInt(localStorage.getItem("sm_user_id")),
          type: "TEXT",
        },
      })
    );
  };

  useGetDeletedGroupMessageConfirmationHook(
    message?.selectedGroup?.visibleGroupConversationId || groupConversationId
  );

  return (
    <>
      <div
        style={{
          height: 915,
          overflowY: "scroll", // Make the table body scrollable
          maxHeight: 920,
        }}
      >
        <Table>
          <TableBody>
            <TableRow>
              <Typography
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  margin: 1,
                }}
                variant="caption"
                color="grey"
              >
                Sun 13:54
              </Typography>
            </TableRow>

            {MessageNonPersist &&
              MessageNonPersist?.all_group_messages?.map((message, index) => {
                const isUserMessage =
                  message?.userId ===
                    parseInt(localStorage.getItem("sm_user_id")) ||
                  message?.primaryKeys?.userId ===
                    parseInt(localStorage.getItem("sm_user_id"));
                return (
                  <>
                    <TableRow
                      key={index} // Using index as the key
                      sx={{
                        display: "flex",
                        justifyContent: isUserMessage ? "end" : "start",
                      }}
                      ref={
                        index ===
                        MessageNonPersist.all_group_messages.length - 1
                          ? scrollRef
                          : null
                      }
                    >
                      <Stack direction="row" alignItems="start">
                        {isUserMessage ? null : (
                          <Avatar
                            src={message?.profilePic}
                            srcSet={message?.profilePic}
                            sx={{
                              width: 25,
                              height: 25,
                            }}
                            alt={message?.userName}
                          />
                        )}
                        {message?.primaryKeys?.type === "IMAGE" ? (
                          <img
                            src={message?.message}
                            alt="not found!"
                            style={
                              isUserMessage
                                ? style.senderMessageStyle
                                : style.recieverMessageStyle
                            }
                            width={500}
                            height={500}
                            onClick={
                              isUserMessage
                                ? (event) => handleClickForMessage(event)
                                : null
                            }
                          />
                        ) : (
                          <Typography
                            sx={
                              isUserMessage
                                ? style.senderMessageStyle
                                : style.recieverMessageStyle
                            }
                            variant="body1"
                            onClick={
                              isUserMessage
                                ? (event) => handleClickForMessage(event)
                                : null
                            }
                          >
                            {message?.message}
                          </Typography>
                        )}
                      </Stack>
                    </TableRow>
                    <Menu
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "simple-menu",
                      }}
                      slotProps={{
                        paper: {
                          style: {
                            borderRadius: 5,
                          },
                        },
                      }}
                    >
                      <MenuItem
                        onClick={() => {
                          handleDeleteEvent(message?.primaryKeys?.messageId);
                          handleClose();
                        }}
                      >
                        <Stack direction="row" spacing={2} alignItems="center">
                          <DeleteOutlineRounded
                            sx={{
                              color: "red",
                            }}
                          />
                          <Typography variant="overline" color="red">
                            Delete
                          </Typography>
                        </Stack>
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleClose();
                        }}
                      >
                        <Stack direction="row" spacing={2} alignItems="center">
                          <ContentCopyRounded
                            sx={{
                              color: "rgb(55, 151, 240,1)",
                            }}
                          />
                          <Typography
                            variant="overline"
                            color="rgb(55, 151, 240,1)"
                          >
                            copy
                          </Typography>
                        </Stack>
                      </MenuItem>
                    </Menu>
                  </>
                );
              })}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
