import axios from "axios";
import { useContext } from "react";
import { useQuery } from "react-query";
import { Context as MessageContext } from "../../context/MessageContext";

const url = () => {
  return axios.create({
    baseURL: "http://localhost:9999/ai/socialmedia/api/v1/private/messages",
  });
};

const url1 = () => {
  return axios.create({
    baseURL:
      "http://localhost:9999/ai/socialmedia/api/v1/private/conversations",
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

const get_all_conversations_of_specific_user = (requiredData) => {
  if (requiredData?.Authorization && requiredData?.userId) {
    return url1().get("/get/all", {
      headers: {
        Authorization: "Bearer " + requiredData?.Authorization,
      },
      params: {
        userId: requiredData?.userId,
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

export const useGet_all_conversations_of_specific_user = (requiredData) => {
  const { set_all_conversations } = useContext(MessageContext);

  return useQuery(
    ["get_all_conversations_of_specific_user", requiredData],
    () => get_all_conversations_of_specific_user(requiredData),
    {
      onError: (error) => {
        console.log(error?.response?.data?.message);
      },
      onSuccess: (data) => {
        if (data?.status === 200) {
          const wholeData = data?.data?.data?.profile_pics_data?.results?.map(
            (profilePics) =>
              profilePics?.profile_details?.map((pics) => {
                const all_data = {
                  profilePic: pics?.urls,
                  userName: profilePics?.userName,
                  userId: profilePics?.userId,
                  conversationDetails: data?.data?.data?.conversation_data?.map(
                    (conversation) =>
                      conversation?.user_conversations?.map(
                        (user_conversation) => {
                          const all_conversation_data = {
                            visibleConversationId:
                              user_conversation?.visibleConversationId,
                            receiverUserId: conversation?.receiverUserId,
                            status: conversation?.status,
                          };
                          return all_conversation_data;
                        }
                      )
                  ),
                };
                return all_data;
              })
          );

          set_all_conversations(wholeData);
        } else {
          set_all_conversations([]);
        }
      },
      refetchOnMount: false,
      enabled: false,
      retry: 5,
      retryDelay: 1000,
    }
  );
};
