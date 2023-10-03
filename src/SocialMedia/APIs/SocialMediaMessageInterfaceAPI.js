import axios from "axios";
import { useContext } from "react";
import { useQuery } from "react-query";
import { Context as MessageContext } from "../../context/MessageContext";

const url = () => {
  return axios.create({
    baseURL: "http://localhost:9999/ai/socialmedia/api/v1/private/messages",
  });
};

const getMessagesOfParticularConversation = (requiredData) => {
  console.log("useGetMessageOfParticularConversation1111", requiredData);

  if (requiredData?.Authorization && requiredData?.conversation_id) {
    return url().get("/get/messages/of/conversation", {
      headers: {
        Authorization: "Bearer " + requiredData?.Authorization,
      },
      params: {
        conversation_id: requiredData?.conversation_id,
      },
    });
  }
};

export const useGetMessageOfParticularConversation = (requiredData) => {
  const { set_sent_messages, set_received_messages, set_error } =
    useContext(MessageContext);

  return useQuery(
    ["getMessagesOfParticularConversation", requiredData],
    () => getMessagesOfParticularConversation(requiredData),
    {
      onError: (error) => {
        set_error(error?.response?.data?.message);
      },
      onSuccess: (data) => {
        if (data?.status === 200) {
          const senderMessage = data?.data?.data?.filter(
            (messages) =>
              messages?.primaryKeys?.userId ===
              parseInt(localStorage.getItem("sm_user_id"))
          );

          senderMessage.map((message) => {
            return set_sent_messages(message);
          });

          const received_messages = data?.data?.data?.filter(
            (messages) =>
              messages?.primaryKeys?.userId !==
              parseInt(localStorage.getItem("sm_user_id"))
          );

          received_messages.map((message) => {
            return set_received_messages(message);
          });
        }
      },
      refetchOnMount: false,
      enabled: false,
      retry: 5,
      retryDelay: 1000,
    }
  );
};
