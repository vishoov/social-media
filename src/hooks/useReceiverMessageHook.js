import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { useDispatch } from "react-redux";
import { set_all_messages } from "../reduxNonPersist/NonPersistMessages";

const useReceiverMessageHook = (conversationId, message, all_messages) => {
  const socketForMessages = new SockJS(
    `${process.env.REACT_APP_WEBSOCKET_FOR_RECEIVING_SEAMLESS_MESSAGES}`
  );

  const dispatch = useDispatch();

  const stompClientForMessages = Stomp.over(socketForMessages);

  const callBack = () => {
    if (all_messages?.length === 0) {
      stompClientForMessages.connect({}, (frame) => {
        // Subscribe to the topic where Kafka messages are sent
        stompClientForMessages.subscribe(
          `/receiver/conversation/${
            message?.selectedConversation?.conversationId || conversationId
          }`,
          (message) => {
            // Handle incoming messages here

            const data = JSON.parse(message?.body);

            dispatch(set_all_messages(data));
          }
        );
      });
    }
  };

  return {
    callBack,
  };
};
export default useReceiverMessageHook;
