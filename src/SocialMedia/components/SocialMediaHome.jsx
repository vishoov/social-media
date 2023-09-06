import React, { useEffect, useState } from "react";
import { AISideBar } from "../../ReuseableComponents/AISideBar";
import { useSelector } from "react-redux";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { Alert, Box, Snackbar, Stack } from "@mui/material";
import Jen1 from "../../static/images/avatar/jen.jpeg";

export const SocialMediaHome = () => {
  const [messages, setMessages] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // useSelector hooks to get the current state of the store
  const socialMediaUser = useSelector((state) => state.socialMediaUser);

  useEffect(() => {
    // Create a SockJS WebSocket connection to the server
    const socket = new SockJS("http://localhost:9989/websocket");

    // Create a Stomp client over the SockJS WebSocket connection
    const stompClient = Stomp.over(socket);

    // Connect to the WebSocket server
    stompClient.connect({}, (frame) => {
      console.log("Connected to WebSocket");

      // Subscribe to the topic where Kafka messages are sent
      stompClient.subscribe(
        `/queue/${socialMediaUser?.value?.SocialMediaUserData?.userId}`,
        (message) => {
          // Handle incoming messages here

          const data = JSON.parse(message.body);
          setMessages(data);

          // Show a Snackbar notification
          setSnackbarMessage(`New message: ${data?.urls}`);
          setSnackbarOpen(true);
        }
      );
    });
  }, [messages, socialMediaUser?.value?.SocialMediaUserData?.userId]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  return (
    <>
      <Stack
        spacing={60}
        direction="row"
        sx={{
          border: "1px solid #000000",
        }}
      >
        <Box>
          <AISideBar />
        </Box>
        <Stack>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={Jen1} alt="nothing" srcSet={Jen1} />
          </Box>
          <Box>
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={6000} // Adjust as needed
              onClose={handleSnackbarClose}
            >
              <Alert onClose={handleSnackbarClose} severity="success">
                {snackbarMessage}
              </Alert>
            </Snackbar>
          </Box>
        </Stack>
      </Stack>
    </>
  );
};
