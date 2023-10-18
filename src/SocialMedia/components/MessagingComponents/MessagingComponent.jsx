import React, { useEffect, useMemo } from "react";
import { RegularMessageShowingPanel } from "./RegularMessageShowingPanel";
import { useDispatch, useSelector } from "react-redux";
import { PendingMessageShowingPenal } from "./PendingMessageShowingPenal";
import { useParams } from "react-router-dom";
import useGetMessagesOfParticularConversationHook from "../../../hooks/useGetMessagesOfParticularConversationHook";
import { reset_all_messages } from "../../../reduxNonPersist/NonPersistMessages";
export const MessagingComponent = () => {
  const messages = useSelector((state) => state.message);

  const { conversationId } = useParams();

  const MessageNonPersist = useSelector((state) => state.NonPersistMessage);

  const { callBack: callBackOfMessages } =
    useGetMessagesOfParticularConversationHook(conversationId, messages);

  const dispatch = useDispatch();

  useMemo(() => {
    dispatch(reset_all_messages());
    callBackOfMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [MessageNonPersist?.deleted_message]);

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
