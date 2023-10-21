import { useDispatch } from "react-redux";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { set_all_group_messages } from "../reduxNonPersist/NonPersistMessages";

const useReceiveGroupMessageHook = (
  message,
  group_conversation_id,
  all_group_messages
) => {
  const socketForMessages = new SockJS(
    `${process.env.REACT_APP_WEBSOCKET_FOR_RECEIVING_SEAMLESS_MESSAGES}`
  );

  const dispatch = useDispatch();

  const stompClientForMessages = Stomp.over(socketForMessages);

  const callBack = () => {
    if (all_group_messages?.length === 0) {
      stompClientForMessages.connect({}, (frame) => {
        // Subscribe to the topic where Kafka messages are sent
        stompClientForMessages.subscribe(
          `/receiver/group/conversation/${
            message?.selectedGroup?.visibleGroupConversationId ||
            group_conversation_id
          }`,
          (message) => {
            // Handle incoming messages here

            const data = JSON.parse(message?.body);

            console.log("message received :::", data);

            dispatch(set_all_group_messages(data));
          }
        );
      });
    }
  };

  return {
    callBack,
  };
};

export default useReceiveGroupMessageHook;
