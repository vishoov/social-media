import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { setNotifications } from "../reduxNonPersist/NonPersistNotificationSlice";
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
            senderProfilePic: data?.profile_data?.results
              ?.at(0)
              ?.profile_details?.at(0)
              ?.urls?.at(0),
            senderUserName: data?.profile_data?.results?.at(0)?.userName,
            visibleGroupConversationId:
              data?.group_data?.visibleGroupConversationId,
            groupName: data?.group_data?.groupName,
            notificationType: data?.type_of_notification,
          };

          console.log("Conversation data :", group_created_notification_build);

          dispatch(setNotifications(group_created_notification_build));
        }
      );
    });
  };

  return {
    callBack,
  };
};

export default useReceiveGroupCreationNotificationHook;
