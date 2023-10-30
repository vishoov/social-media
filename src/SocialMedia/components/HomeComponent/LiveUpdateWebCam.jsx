import { CircleRounded, ClearRounded } from "@mui/icons-material";
import { Box, Modal, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 720, // Set the width of the webcam (you can adjust this)
  height: 1000, // Set the height of the webcam (you can adjust this)
  aspectRatio: 0.5, // Set the aspect ratio of the webcam
};

const LiveUpdateWebCam = ({ open, handleClose, passImage }) => {
  const [webcamLoaded, setWebcamLoaded] = useState(true);
  const webcamRef = useRef(null);

  useEffect(() => {
    // Simulate a delay (you can replace this with actual initialization logic)
    setTimeout(() => {
      setWebcamLoaded(false);
    }, 3000); // Adjust the delay as needed
  }, []);

  const capture = () => {
    console.log("Capture");
    const imageSrcForUpdates = webcamRef.current.getScreenshot();
    // Do something with the captured image source, e.g., display it or save it.

    // const buildMessage = {
    //   primaryKeys: {
    //     userId: parseInt(localStorage.getItem("sm_user_id")),
    //     type: "IMAGE",
    //   },
    //   visibleGroupConversationId: parseInt(
    //     message?.selectedGroup?.visibleGroupConversationId ||
    //       groupConversationId
    //   ),
    //   message: imageSrc, // Set the message to the base64 image data
    //   userName:
    //     auth?.value?.signinData?.userName ||
    //     socialMediaUser?.value?.SocialMediaUserData?.userName,
    //   profilePic: profilePic,
    //   groupName: message?.selectedGroup?.groupName,
    // };

    // stompClientForSendMessage.send(
    //   `/conversation/group/send/image/${
    //     message?.selectedGroup?.visibleGroupConversationId ||
    //     groupConversationId
    //   }`,
    //   {},
    //   JSON.stringify(buildMessage)
    // );

    handleClose();

    passImage(imageSrcForUpdates);
  };

  return (
    <>
      {webcamLoaded && (
        <Typography
          sx={{
            marginLeft: 20,
          }}
        >
          Loading...
        </Typography>
      )}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            height: 1000,
            width: 800,
          }}
        >
          <Webcam
            videoConstraints={videoConstraints}
            style={{
              borderRadius: "14px",
              height: "80vh",
              marginTop: 120,
              marginLeft: 500,
            }}
            ref={webcamRef}
          />

          {webcamLoaded === false && (
            <Box
              sx={{
                position: "absolute",
                bottom: "15%",
                right: "48%",
                width: 80,
                height: 80,
                color: "transparent",
                border: "3px solid white",
                borderRadius: "50%",
                cursor: "pointer",
              }}
              onClick={capture}
            >
              <CircleRounded />
            </Box>
          )}
          {/* {webcamLoaded === false && (
            <Box
              sx={{
                position: "absolute",
                top: "12%",
                right: "29%",
                cursor: "pointer",
              }}
            >
              <LibraryMusicRounded
                sx={{
                  color: "white",
                  height: 30,
                  width: 30,
                  backgroundColor: "GrayText",
                  borderRadius: 10,
                  padding: 1,
                }}
              />
            </Box>
          )} */}
          {webcamLoaded === false && (
            <Box
              sx={{
                position: "absolute",
                bottom: "94%",
                right: "0.5%",
                cursor: "pointer",
              }}
              onClick={handleClose}
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
            </Box>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default LiveUpdateWebCam;
