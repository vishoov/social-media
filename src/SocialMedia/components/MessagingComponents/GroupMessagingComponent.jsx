import React, { useEffect, useMemo } from "react";
import { GroupRegularMessageShowingPenal } from "./GroupRegularMessageShowingPenal";
import { useDispatch, useSelector } from "react-redux";
import useGetGroupMessageHook from "../../../hooks/useGetGroupMessagesHook";
import { useParams } from "react-router-dom";
import { reset_all_group_messages } from "../../../reduxNonPersist/NonPersistMessages";

export const GroupMessagingComponent = () => {
  const messages = useSelector((state) => state.message);

  const { groupConversationId } = useParams();

  const MessageNonPersist = useSelector((state) => state.NonPersistMessage);

  const { callBack: callBackOfMessages } = useGetGroupMessageHook(
    groupConversationId,
    messages
  );

  const dispatch = useDispatch();

  useMemo(() => {
    dispatch(reset_all_group_messages());
    callBackOfMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [MessageNonPersist?.delete_group_messages]);

  useEffect(() => {
    if (MessageNonPersist?.all_group_messages?.length === 0) {
      callBackOfMessages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [MessageNonPersist?.all_group_messages]);

  return (
    <>
      <GroupRegularMessageShowingPenal />
    </>
  );
};
