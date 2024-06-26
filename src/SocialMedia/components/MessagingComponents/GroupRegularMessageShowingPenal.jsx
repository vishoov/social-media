import React, { useEffect, useState } from "react";
import { GroupRealMessageShowingPenal } from "./GroupRealMessageShowingPenal";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
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
import { AISideBar } from "../../../ReuseableComponents/AISideBar";
import {
  MicRounded,
  MoreHorizRounded,
  PersonalVideoRounded,
  SentimentSatisfiedRounded,
} from "@mui/icons-material";
import { ModelForMaintainingTheConversations } from "../MessagingComponents/ModelForMaintainingTheConversations";
import videoCall from "../../../static/images/utils/video-call.png";
import frame from "../../../static/images/utils/frame.png";
import gellery from "../../../static/images/utils/gallery.png";
import useGetProfilePicFromCacheHook from "../../../hooks/useGetProfilePicFromCacheHook";
import { MessageWebCamForGroup } from "./MessageWebCamForGroup";

const RealMessageShowingPenalHandler = () => {
  return <GroupRealMessageShowingPenal />;
};

const socketForSendMessage = new SockJS(
  `${process.env.REACT_APP_WEBSOCKET_FOR_RECEIVING_SEAMLESS_MESSAGES}`
);

// Create a Stomp client over the SockJS WebSocket connection
const stompClientForSendMessage = Stomp.over(socketForSendMessage);

export const GroupRegularMessageShowingPenal = () => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      message: "",
    },
  });

  const { groupConversationId } = useParams();

  const message = useSelector((state) => state.message);

  const [open, setOpen] = useState(false);

  const auth = useSelector((state) => state.auth);
  const socialMediaUser = useSelector((state) => state.socialMediaUser);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [OpenWebCam, setOpenWebCam] = useState(false);
  const handleWebCamClose = () => setOpenWebCam(false);

  const [callBack, profilePic] = useGetProfilePicFromCacheHook();

  useEffect(() => {
    callBack();
    // eslint-disable-next-line
  }, []);

  const submit = (data) => {
    if (data && data?.message) {
      const buildMessage = {
        primaryKeys: {
          userId: parseInt(localStorage.getItem("sm_user_id")),
          type: "TEXT",
        },
        visibleGroupConversationId: parseInt(
          message?.selectedGroup?.visibleGroupConversationId ||
            groupConversationId
        ),
        message: data?.message,
        userName:
          auth?.value?.signinData?.userName ||
          socialMediaUser?.value?.SocialMediaUserData?.userName,
        profilePic: profilePic?.current,
      };
      console.log("buildMessage", buildMessage);
      stompClientForSendMessage.send(
        `/conversation/group/${
          message?.selectedGroup?.visibleGroupConversationId ||
          groupConversationId
        }`,
        {},
        JSON.stringify(buildMessage)
      );
    }
  };

  const handleGelleryClick = () => {
    document.getElementById("image-input").click();
  };

  const handleImageChange1 = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const base64Image = e.target.result;

        const buildMessage = {
          primaryKeys: {
            userId: parseInt(localStorage.getItem("sm_user_id")),
            type: "IMAGE",
          },
          visibleGroupConversationId: parseInt(
            message?.selectedGroup?.visibleGroupConversationId ||
              groupConversationId
          ),
          message: base64Image, // Set the message to the base64 image data
          userName:
            auth?.value?.signinData?.userName ||
            socialMediaUser?.value?.SocialMediaUserData?.userName,
          profilePic: profilePic?.current,
          groupName: message?.selectedGroup?.groupName,
        };

        stompClientForSendMessage.send(
          `/conversation/group/send/image/${
            message?.selectedGroup?.visibleGroupConversationId ||
            groupConversationId
          }`,
          {},
          JSON.stringify(buildMessage)
        );
      };
      reader.readAsDataURL(file);
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
                  src={message?.selectedGroup?.profilePic}
                  srcSet={message?.selectedGroup?.profilePic}
                  alt="not found!"
                />
              }
              label={message?.selectedGroup?.groupName}
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
                  fontSize: "23px",
                }}
              />
              <img
                src={videoCall}
                srcSet={videoCall}
                alt="not found"
                style={{
                  width: "23px",
                  height: "23px",
                }}
              />
              <MoreHorizRounded
                sx={{
                  fontSize: "23px",
                }}
              />
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
            spacing={3}
            alignItems="center"
            justifyContent="center"
          >
            <SentimentSatisfiedRounded
              sx={{
                fontSize: 30,
                cursor: "pointer",
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
            <img
              src={frame}
              srcSet={frame}
              alt="not found"
              style={{
                width: "23px",
                height: "23px",
                cursor: "pointer",
              }}
              onClick={() => {
                setOpenWebCam(true);
              }}
            />

            <img
              src={gellery}
              srcSet={gellery}
              alt="not found"
              style={{
                width: "25px",
                height: "25px",
                cursor: "pointer",
              }}
              onClick={handleGelleryClick}
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
          <MessageWebCamForGroup
            height={1000}
            width={600}
            onClose={handleWebCamClose}
            message={message}
            groupConversationId={groupConversationId}
            auth={auth}
            socialMediaUser={socialMediaUser}
            profilePic={profilePic?.current}
          />
        </div>
      </Modal>

      {/* model for the choosing the person */}
      <ModelForMaintainingTheConversations
        open={open}
        handleClose={handleClose}
      />
      <input
        type="file"
        id="image-input"
        accept="image/jpeg"
        style={{ display: "none" }}
        onChange={handleImageChange1}
      />
    </>
  );
};
