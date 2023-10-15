import React, { useEffect } from "react";
import { RegularMessageShowingPanel } from "./RegularMessageShowingPanel";
import { useSelector } from "react-redux";
import { PendingMessageShowingPenal } from "./PendingMessageShowingPenal";
import { useParams } from "react-router-dom";
import useGetMessagesOfParticularConversationHook from "../../../hooks/useGetMessagesOfParticularConversationHook";
export const MessagingComponent = () => {
  const messages = useSelector((state) => state.message);

  const { conversationId } = useParams();

  const MessageNonPersist = useSelector((state) => state.NonPersistMessage);

  const { callBack: callBackOfMessages } =
    useGetMessagesOfParticularConversationHook(conversationId, messages);

  useEffect(() => {
    if (MessageNonPersist?.all_messages?.length === 0) {
      callBackOfMessages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [MessageNonPersist?.all_messages]);

  return (
    <>
      {messages?.selectedConversation?.status === "ACCEPTED" ||
      messages?.selectedConversation?.status === undefined ? (
        <RegularMessageShowingPanel />
      ) : (
        <PendingMessageShowingPenal />
      )}
    </>
  );
};
