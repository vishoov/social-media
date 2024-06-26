import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { setHomeMemoriesContent } from "../reduxNonPersist/NonPersistForHomeSlice";
import { setMemoriesNotification } from "../reduxNonPersist/NonPersistNotificationSlice";

const useMemoriesSubscribeHook = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const dispatch = useDispatch();

  // useSelector hooks to get the current state of the store
  const socialMediaUser = useSelector((state) => state.socialMediaUser);

  const callBackForSocketConnection = useCallback(() => {
    console.log("new connection...");

    const socket = new SockJS(
      `${process.env.REACT_APP_WEBSOCKET_FOR_MEMORIES}`
    );

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

          dispatch(setHomeMemoriesContent(jsonData));
          dispatch(setMemoriesNotification(jsonData));

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
