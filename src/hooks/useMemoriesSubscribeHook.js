import { useCallback, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
// import { setHomeMemoriesContent } from "../redux/SocialMediaHomeSlice";
// import { setMemoriesNotification } from "../redux/Notifications";
import { Context as HomeContext } from "../context/HomeContext";
import { Context as NotificationsContext } from "../context/NotificationContext";

const useMemoriesSubscribeHook = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // context variables
  const { setHomeMemoriesContent } = useContext(HomeContext);
  const { setMemoriesNotification } = useContext(NotificationsContext);

  // useSelector hooks to get the current state of the store
  const socialMediaUser = useSelector((state) => state.socialMediaUser);

  const callBackForSocketConnection = useCallback(() => {
    const socket = new SockJS("http://localhost:9989/websocket");

    // Create a Stomp client over the SockJS WebSocket connection
    const stompClient = Stomp.over(socket);

    // Connect to the WebSocket server
    stompClient.connect({}, (frame) => {
      // Subscribe to the topic where Kafka messages are sent
      stompClient.subscribe(
        `/queue/${
          socialMediaUser?.value?.SocialMediaUserData?.userId ||
          localStorage.getItem("sm_user_id")
        }`,
        (message) => {
          // Handle incoming messages here
          const data = JSON.parse(message.body);

          const jsonData = {
            urls: data?.urls,
            userName: data?.userName,
            feelings: data?.feelings,
            profileUrl: data?.profileData?.results
              ?.at(0)
              ?.profile_details?.at(0)
              ?.urls?.at(0),
            created: data?.created,
          };

          setHomeMemoriesContent(jsonData);
          setMemoriesNotification(jsonData);

          // Show a Snackbar notification
          setSnackbarMessage(`${data?.userName} just shared a memory`);
          setSnackbarOpen(true);
        }
      );
    });

    // when i wrote above line now i didn't need to include setHomeMemoriesContent to dependency array

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socialMediaUser?.value?.SocialMediaUserData?.userId]);

  useEffect(() => {
    callBackForSocketConnection();
  }, [callBackForSocketConnection]);

  return {
    snackbarOpen,
    snackbarMessage,
  };
};

export default useMemoriesSubscribeHook;
