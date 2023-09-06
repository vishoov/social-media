import React, { useState } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

export const HomeInterface = () => {
  // state variables
  const [messages, setMessages] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // useSelector hooks to get the current state of the store
  const socialMediaUser = useSelector((state) => state.socialMediaUser);

  useEffect(() => {
    console.log(
      "data ---->",
      socialMediaUser?.value?.SocialMediaUserData?.userId
    );

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

          const data = message.body;
          setMessages([...messages, data]);

          console.log("Jenna posted new post", data);

          // Show a Snackbar notification
          setSnackbarMessage(`New message: ${data}`);
          setSnackbarOpen(true);
        }
      );
    });
  }, [messages]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  return (
    <div>
      <ul>
        {messages?.map((message, index) => {
          return <li key={index}>{message?.urls}</li>;
        })}
      </ul>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000} // Adjust as needed
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};
