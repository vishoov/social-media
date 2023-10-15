import { useCallback } from "react";
import { useDispatch } from "react-redux";

import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { setMessagesNotification } from "../reduxNonPersist/NonPersistNotificationSlice";

const useReceivePushNotificationHook = () => {
  const socket = new SockJS(
    `${process.env.REACT_APP_WEBSOCKET_FOR_RECEIVING_PUSH_NOTIFICATIONS}`
  );

  const dispatch = useDispatch();

  const stompClient = Stomp.over(socket);
  const callBack = useCallback(() => {
    stompClient.connect({}, (frame) => {
      // Subscribe to the topic where Kafka messages are sent
      stompClient.subscribe(
        `/push/notification/to/accepted/${localStorage.getItem("sm_user_id")}`,
        (message) => {
          // Handle incoming messages here
          const data = JSON.parse(message?.body);

          dispatch(setMessagesNotification(data));
        }
      );

      stompClient.subscribe(
        `/push/notification/to/pending/${localStorage.getItem("sm_user_id")}`,
        (message) => {
          // Handle incoming messages here
          const data = JSON.parse(message?.body);

          dispatch(setMessagesNotification(data));
        }
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    callBack,
  };
};

export default useReceivePushNotificationHook;
