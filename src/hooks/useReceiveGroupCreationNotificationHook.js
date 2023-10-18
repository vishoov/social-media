import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { setGroupCreationNotification } from "../reduxNonPersist/NonPersistNotificationSlice";
import { useDispatch } from "react-redux";

const useReceiveGroupCreationNotificationHook = () => {
  const socketForMessages = new SockJS(
    `${process.env.REACT_APP_WEBSOCKET_FOR_RECEIVING_PUSH_NOTIFICATIONS}`
  );

  const stompClientForMessages = Stomp.over(socketForMessages);

  const dispatch = useDispatch();

  const callBack = () => {
    console.log("connected to group socket...");

    stompClientForMessages.connect({}, (frame) => {
      // Subscribe to the topic where Kafka messages are sent
      stompClientForMessages.subscribe(
        `/push/notification/for/message/creation/${localStorage.getItem(
          "sm_user_id"
        )}`,
        (message) => {
          // Handle incoming messages here

          const data = JSON.parse(message?.body);

          const group_created_notification_build = {
            profilePic: data?.data?.results
              ?.at(0)
              ?.profile_details?.at(0)
              ?.urls?.at(0),
            userName: data?.data?.results?.at(0)?.userName,
            type_of_notification: data?.type_of_notification,
          };

          dispatch(
            setGroupCreationNotification(group_created_notification_build)
          );
        }
      );
    });
  };

  return {
    callBack,
  };
};

export default useReceiveGroupCreationNotificationHook;
