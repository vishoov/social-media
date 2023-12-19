import { CircleRounded, ClearRounded } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

const socketForSendMessage = new SockJS(
  `${process.env.REACT_APP_WEBSOCKET_FOR_RECEIVING_SEAMLESS_MESSAGES}`
);

// Create a Stomp client over the SockJS WebSocket connection
const stompClientForSendMessage = Stomp.over(socketForSendMessage);

export const MessageWebCam = ({
  height,
  width,
  onClose,
  message,
  conversationId,
}) => {
  const [webcamLoaded, setWebcamLoaded] = useState(true);
  const webcamRef = useRef(null);

  useEffect(() => {
    // Simulate a delay (you can replace this with actual initialization logic)
    setTimeout(() => {
      setWebcamLoaded(false);
    }, 3000); // Adjust the delay as needed
  }, []);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    // Do something with the captured image source, e.g., display it or save it.

    const buildMessage = {
      primaryKeys: {
        userId: parseInt(localStorage.getItem("sm_user_id")),
        type: "IMAGE",
      },
      visibleConversationId: parseInt(
        message?.selectedConversation?.conversationId || conversationId
      ),
      message: imageSrc,
      receiverUserId: message?.selectedConversation?.userId,
    };

    console.log("build message :::", buildMessage);

    stompClientForSendMessage.send(
      `/conversation/send/image/${
        message?.selectedConversation?.conversationId || conversationId
      }`,
      {},
      JSON.stringify(buildMessage)
    );

    onClose();
  };

  return (
    <>
      <div>
        {webcamLoaded && (
          <Typography
            sx={{
              marginLeft: 20,
            }}
          >
            Loading...
          </Typography>
        )}
        <Webcam
          videoConstraints={{
            width: width, // Set the width of the webcam (you can adjust this)
            height: height, // Set the height of the webcam (you can adjust this)
            facingMode: "user",
          }}
          screenshotFormat="image/jpeg"
          style={{
            borderRadius: 5,
          }}
          ref={webcamRef}
        />
        {webcamLoaded === false && (
          <IconButton
            sx={{
              position: "absolute",
              bottom: "6%",
              right: "42.5%",
              width: 80,
              height: 80,
              color: "transparent",
              border: "3px solid white",
            }}
            onClick={capture}
          >
            <CircleRounded />
          </IconButton>
        )}
        {webcamLoaded === false && (
          <IconButton
            sx={{
              position: "absolute",
              bottom: "92%",
              right: "0.5%",
            }}
            onClick={onClose}
          >
            <ClearRounded
              sx={{
                color: "white",
                width: 25,
                height: 25,
                backgroundColor: "GrayText",
                borderRadius: 10,
                padding: 1,
              }}
            />
          </IconButton>
        )}
      </div>
    </>
  );
};
