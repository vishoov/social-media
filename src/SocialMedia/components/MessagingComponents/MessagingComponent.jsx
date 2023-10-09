<<<<<<< HEAD
import React, { useContext, useEffect } from "react";
=======
import React, { useState } from "react";
>>>>>>> defdabe (NEW)
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { AISideBar } from "../../../ReuseableComponents/AISideBar";
import {
  Avatar,
  Chip,
  Divider,
  InputAdornment,
  InputBase,
  Paper,
  Stack,
} from "@mui/material";

import {
  InsertPhotoRounded,
  MicRounded,
  MoreHorizRounded,
  PersonalVideoRounded,
  SentimentSatisfiedRounded,
  VideocamRounded,
} from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ModelForMaintainingTheConversations } from "../../../ReuseableComponents/Messaging/ModelForMaintainingTheConversations";
<<<<<<< HEAD
import { Context as MessageContext } from "../../../context/MessageContext";
import { RealMessageShowingPenal } from "../../../ReuseableComponents/Messaging/RealMessageShowingPenal";
import { useGetMessageOfParticularConversation } from "../../APIs/SocialMediaMessageInterfaceAPI";
import { useCookies } from "react-cookie";

export const MessagingComponent = () => {
  const { set_sent_messages } = useContext(MessageContext);

=======
import { RealMessageShowingPenal } from "../../../ReuseableComponents/Messaging/RealMessageShowingPenal";
import { Provider as MessageProvider } from "../../../context/MessageContext";

const socketForSendMessage1 = new SockJS("http://localhost:9988/websocket");

// Create a Stomp client over the SockJS WebSocket connection
const stompClientForSendMessage1 = Stomp.over(socketForSendMessage1);

const RealMessageShowingPenalHandler = React.memo(() => {
  return (
    <MessageProvider>
      <RealMessageShowingPenal />
    </MessageProvider>
  );
});

export const MessagingComponent = () => {
>>>>>>> defdabe (NEW)
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      message: "",
    },
  });

  const { conversationId } = useParams();
<<<<<<< HEAD

  const {
    state: { sent_messages },
  } = useContext(MessageContext);

  const [cookies] = useCookies(["avt_token"]);

  const message = useSelector((state) => state.message);

  const { refetch } = useGetMessageOfParticularConversation({
    Authorization: cookies?.avt_token,
    conversation_id:
      message?.selectedConversation?.conversationId || conversationId,
  });

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const socket = new SockJS("http://localhost:9988/websocket");

  // Create a Stomp client over the SockJS WebSocket connection
  const stompClient = Stomp.over(socket);

  const [open, setOpen] = React.useState(false);
=======
  const message = useSelector((state) => state.message);

  const [open, setOpen] = useState(false);
>>>>>>> defdabe (NEW)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const submit = (data) => {
<<<<<<< HEAD
    const buildMessage = {
      primaryKeys: {
        userId: parseInt(localStorage.getItem("sm_user_id")),
        type: "TEXT",
      },
      visibleConversationId: parseInt(
        message?.selectedConversation?.conversationId || conversationId
      ),
      message: data?.message,
      receiverUserId: message?.selectedConversation?.userId,
    };

    set_sent_messages({ message: data?.message });

    // if (sent_messages?.length < 1) {
    stompClient.send(
      `/create/conversation/${conversationId}`,
      {},
      JSON.stringify(buildMessage)
    );
    // } else {
    //   stompClient.send(
    //     `/update/conversation/${conversationId}`,
    //     {},
    //     JSON.stringify(buildMessage)
    //   );
    // }
=======
    if (data && data?.message) {
      const buildMessage = {
        primaryKeys: {
          userId: parseInt(localStorage.getItem("sm_user_id")),
          type: "TEXT",
        },
        visibleConversationId: parseInt(
          message?.selectedConversation?.conversationId || conversationId
        ),
        message: data?.message,
        receiverUserId: message?.selectedConversation?.userId,
      };
      stompClientForSendMessage1.send(
        `/conversation/${
          message?.selectedConversation?.conversationId || conversationId
        }`,
        {},
        JSON.stringify(buildMessage)
      );
    }
>>>>>>> defdabe (NEW)
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
            spacing={123}
            alignItems="center"
          >
            <Chip
              onClick={handleOpen}
              avatar={
                <Avatar
                  src={message?.selectedConversation?.profilePic}
                  srcSet={message?.selectedConversation?.profilePic}
                  alt="not found!"
                />
              }
              label={message?.selectedConversation?.userName}
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
<<<<<<< HEAD
          <RealMessageShowingPenal />

=======

          <RealMessageShowingPenalHandler />
>>>>>>> defdabe (NEW)
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

      {/* model for the choosing the person */}
      <ModelForMaintainingTheConversations
        open={open}
        handleClose={handleClose}
      />
    </>
  );
};
