import {
  Avatar,
  Chip,
  Divider,
  InputAdornment,
  InputBase,
  Modal,
  Paper,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
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
import { RealMessageShowingPenal } from "../../../ReuseableComponents/Messaging/RealMessageShowingPenal";
import { ModelForMaintainingTheConversations } from "../../../ReuseableComponents/Messaging/ModelForMaintainingTheConversations";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { MessageWebCam } from "./MessageWebCam";

const socketForSendMessage = new SockJS("http://localhost:9988/websocket");

// Create a Stomp client over the SockJS WebSocket connection
const stompClientForSendMessage = Stomp.over(socketForSendMessage);

const RealMessageShowingPenalHandler = React.memo(() => {
  return <RealMessageShowingPenal />;
});

export const RegularMessageShowingPanel = () => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      message: "",
    },
  });

  const { conversationId } = useParams();

  const message = useSelector((state) => state.message);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [OpenWebCam, setOpenWebCam] = useState(false);
  const handleWebCamClose = () => setOpenWebCam(false);

  const submit = (data) => {
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
      stompClientForSendMessage.send(
        `/conversation/${
          message?.selectedConversation?.conversationId || conversationId
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

          <RealMessageShowingPenalHandler />
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
                cursor: "pointer",
              }}
              onClick={() => {
                setOpenWebCam(true);
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

      <Modal open={OpenWebCam} onClose={handleWebCamClose}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "transparent",
            outline: "none",
          }}
        >
          <MessageWebCam
            height={1000}
            width={600}
            onClose={handleWebCamClose}
            message={message}
            conversationId={conversationId}
          />
        </div>
      </Modal>

      {/* model for the choosing the person */}
      <ModelForMaintainingTheConversations
        open={open}
        handleClose={handleClose}
      />
    </>
  );
};
