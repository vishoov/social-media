import { useCallback, useEffect } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { set_delete_group_messages } from "../reduxNonPersist/NonPersistMessages";
import { useDispatch } from "react-redux";

const useGetDeletedGroupMessageConfirmationHook = (
  visibleGroupConversationId
) => {
  const socket = new SockJS(
    `${process.env.REACT_APP_WEBSOCKET_FOR_RECEIVING_SEAMLESS_MESSAGES}`
  );

  const dispatch = useDispatch();

  const stompClient = Stomp.over(socket);

  const callBack = useCallback(() => {
    stompClient.connect({}, (frame) => {
      // Subscribe to the topic where Kafka messages are sent
      stompClient.subscribe(
        `/delete/group/message/${visibleGroupConversationId}`,
        (message) => {
          // Handle incoming messages here
          const data = JSON.parse(message?.body);

          console.log("message deleted :::------>", data);

          dispatch(set_delete_group_messages(data));
        }
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    callBack();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useGetDeletedGroupMessageConfirmationHook;
