import React, { useCallback, useEffect, useRef } from "react";
import {
  Menu,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableRow,
  Typography,
} from "@mui/material";
import useReceiverMessageHook from "../../hooks/useReceiverMessageHook";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ContentCopyRounded, DeleteOutlineRounded } from "@mui/icons-material";

const style = {
  recieverMessageStyle: {
    margin: 1.5,
    border: "white",
    borderRadius: "8px",
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
    borderRadius: "8px",
    backgroundColor: "rgb(55, 151, 240,1)",
    color: "white",
    padding: 1.3, // Adjust padding as needed
    width: "auto", // This allows the width to expand with content
    display: "inline-block",
    maxWidth: 800, // This allows the width to expand with content
    cursor: "pointer",
  },
};

export const RealMessageShowingPenal = () => {
  const { conversationId } = useParams();

  const message = useSelector((state) => state.message);

  const MessageNonPersist = useSelector((state) => state.NonPersistMessage);

  // message subscription hook
  const { callBack } = useReceiverMessageHook(
    conversationId,
    message,
    MessageNonPersist?.all_messages
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
    console.log("message non persist :::", MessageNonPersist?.all_messages);
  }, [MessageNonPersist?.all_messages]);

  useEffect(() => {
    // Scroll to the most recent message when new messages arrive
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [MessageNonPersist]);

  useEffect(() => {
    // Save the index of the most recent message in local storage
    if (MessageNonPersist?.all_messages) {
      localStorage.setItem(
        "mostRecentMessageIndex",
        MessageNonPersist.all_messages.length - 1
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

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event?.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuData = [
    {
      icon: (
        <DeleteOutlineRounded
          sx={{
            color: "red",
          }}
        />
      ),
      label: (
        <Typography variant="overline" color="red">
          Delet
        </Typography>
      ),
    },
    {
      icon: (
        <ContentCopyRounded
          sx={{
            color: "rgb(55, 151, 240,1)",
          }}
        />
      ),
      label: (
        <Typography variant="overline" color="rgb(55, 151, 240,1)">
          copy
        </Typography>
      ),
    },
  ];

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
              MessageNonPersist?.all_messages?.map((message, index) => {
                const isUserMessage =
                  message?.userId ===
                    parseInt(localStorage.getItem("sm_user_id")) ||
                  message?.primaryKeys?.userId ===
                    parseInt(localStorage.getItem("sm_user_id"));
                return (
                  <TableRow
                    key={index} // Using index as the key
                    sx={{
                      display: "flex",
                      justifyContent: isUserMessage ? "end" : "start",
                    }}
                    ref={
                      index === MessageNonPersist.all_messages.length - 1
                        ? scrollRef
                        : null
                    }
                  >
                    <Typography
                      sx={
                        {
                          // ... (other message style properties)
                        }
                      }
                      variant="caption"
                      color="grey"
                    >
                      {message.timestamp}
                    </Typography>

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
                      />
                    ) : (
                      <Typography
                        sx={
                          isUserMessage
                            ? style.senderMessageStyle
                            : style.recieverMessageStyle
                        }
                        variant="body1"
                        onClick={handleClick}
                      >
                        {message?.message}
                      </Typography>
                    )}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          slotProps={{
            paper: {
              style: {
                borderRadius: 5,
              },
            },
          }}
        >
          {menuData.map((item, index) => {
            return (
              <MenuItem
                key={index}
                onClick={() => {
                  handleClose();
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  {item.icon}
                  {item.label}
                </Stack>
              </MenuItem>
            );
          })}
        </Menu>
      </div>
    </>
  );
};
