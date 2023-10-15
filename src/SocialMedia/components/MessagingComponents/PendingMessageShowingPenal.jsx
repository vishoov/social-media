import {
  Avatar,
  Chip,
  Divider,
  InputAdornment,
  InputBase,
  Paper,
  Stack,
  Table,
  TableBody,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AISideBar } from "../../../ReuseableComponents/AISideBar";
import {
  InsertPhotoRounded,
  MicRounded,
  MoreHorizRounded,
  PersonalVideoRounded,
  SentimentSatisfiedRounded,
  VideocamRounded,
} from "@mui/icons-material";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { ModelForShowingRequestInMessages } from "./ModelForShowingRequestInMessages";

const socketForSendMessage = new SockJS("http://localhost:9988/websocket");

// Create a Stomp client over the SockJS WebSocket connection
const stompClientForSendMessage = Stomp.over(socketForSendMessage);

const style = {
  recieverMessageStyle: {
    margin: 1.5,
    border: "1px solid white",
    borderRadius: "8px",
    backgroundColor: "rgb(238, 238, 238)",
    padding: 1.3, // Adjust padding as needed
    width: "auto", // This allows the width to expand with content
    display: "inline-block",
    maxWidth: 800,
  },
  senderMessageStyle: {
    margin: 1.5,
    border: "1px solid white",
    borderRadius: "8px",
    // backgroundColor: "rgb(238, 238, 238)",
    backgroundColor: "rgb(55, 151, 240,1)",
    color: "white",
    padding: 1.3, // Adjust padding as needed
    width: "auto", // This allows the width to expand with content
    display: "inline-block",
    maxWidth: 800, // This allows the width to expand with content
  },
};

const PendingRealMessageHendler = React.memo(() => {
  const MessageNonPersist = useSelector((state) => state.NonPersistMessage);

  return (
    <div
      style={{
        height: 900,
        overflowY: "scroll", // Make the table body scrollable
        maxHeight: 900,
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
            MessageNonPersist?.all_messages?.map((message) => {
              return (
                <TableRow key={message}>
                  {message?.primaryKeys?.type === "IMAGE" ? (
                    <img
                      src={message?.message}
                      alt="not found!"
                      style={style.recieverMessageStyle}
                      width={500}
                      height={500}
                    />
                  ) : (
                    <Typography sx={style.recieverMessageStyle} variant="body1">
                      {message?.message}
                    </Typography>
                  )}
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
});

export const PendingMessageShowingPenal = () => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      message: "",
    },
  });

  const { conversationId } = useParams();

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  const messages = useSelector((state) => state.message);

  const submit = (data) => {
    if (data && data?.message) {
      const buildMessage = {
        primaryKeys: {
          userId: parseInt(localStorage.getItem("sm_user_id")),
          type: "TEXT",
        },
        visibleConversationId: parseInt(
          messages?.selectedConversation?.conversationId || conversationId
        ),
        message: data?.message,
        receiverUserId: messages?.selectedConversation?.userId,
      };
      stompClientForSendMessage.send(
        `/conversation/${
          messages?.selectedConversation?.conversationId || conversationId
        }`,
        {},
        JSON.stringify(buildMessage)
      );
    }
  };

  return (
    <>
      <Stack direction="row" spacing={37.5}>
        <AISideBar />
        <Stack
          direction="column"
          sx={{
            padding: 1.5,
          }}
        >
          <Stack
            sx={{
              padding: "7px",
            }}
            direction="row"
            spacing={122}
            alignItems="center"
          >
            <Chip
              avatar={
                <Avatar
                  src={messages?.selectedConversation?.profilePic}
                  srcSet={messages?.selectedConversation?.profilePic}
                  alt="not found!"
                />
              }
              label={messages?.selectedConversation?.userName}
              variant="outlined"
              size="medium"
              sx={{
                paddingLeft: "5px",
                paddingRight: "300px",
                paddingTop: "20px",
                paddingBottom: "20px",
                fontWeight: "bold",
              }}
            />
            <Stack direction="row" spacing={2} alignItems="center">
              <PersonalVideoRounded
                sx={{
                  fontSize: "20px",
                }}
              />
              <VideocamRounded />
              <MoreHorizRounded />
            </Stack>
          </Stack>
          <Divider
            color="lightblue"
            sx={{
              width: 1540,
            }}
          />
          <PendingRealMessageHendler />

          <Stack
            direction="row"
            spacing={4}
            alignItems="center"
            justifyContent="center"
          >
            <SentimentSatisfiedRounded
              sx={{
                fontSize: 30,
              }}
            />

            <Paper
              sx={{
                border: "1px solid white",
                borderRadius: "10px",
                padding: "4px",
              }}
              elevation={1}
            >
              <InputBase
                placeholder="send a message..."
                sx={{
                  width: 1300,
                  height: 40,
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit(submit)();
                    reset({ message: null });
                  }
                }}
                {...register("message", { required: true })}
                startAdornment={
                  <InputAdornment position="start"></InputAdornment>
                }
              />
            </Paper>
            <InsertPhotoRounded
              sx={{
                fontSize: 30,
              }}
            />
            <MicRounded
              sx={{
                fontSize: 30,
              }}
            />
          </Stack>
        </Stack>
      </Stack>
      <ModelForShowingRequestInMessages
        open={open}
        handleClose={handleClose}
        message={messages}
      />
    </>
  );
};
