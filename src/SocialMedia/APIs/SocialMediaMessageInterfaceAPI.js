import axios from "axios";

import { useMutation, useQuery } from "react-query";

import { useDispatch } from "react-redux";
import { set_all_messages } from "../../reduxNonPersist/NonPersistMessages";
import {
  set_all_conversations,
  set_all_conversation_requests,
} from "../../reduxNonPersist/NonPersistConversationSlice";

const url = () => {
  return axios.create({
    baseURL: `${process.env.REACT_APP_API_HOST_NAME}/ai/socialmedia/api/v1/private/messages`,
  });
};

const url1 = () => {
  return axios.create({
    baseURL: `${process.env.REACT_APP_API_HOST_NAME}/ai/socialmedia/api/v1/private/conversations`,
  });
};

const getMessagesOfParticularConversation = (requiredData) => {
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

const get_all_conversations_request_of_specific_user = (requiredData) => {
  if (requiredData?.Authorization && requiredData?.userId) {
    return url1().get("/get/all/requests", {
      headers: {
        Authorization: "Bearer " + requiredData?.Authorization,
      },
      params: {
        userId: requiredData?.userId,
      },
    });
  }
};

const update_user_conversation_request_permissions = (requiredData) => {
  if (
    requiredData?.Authorization &&
    requiredData?.conversationId &&
    requiredData?.status &&
    requiredData?.userId
  ) {
    return url1().put("/update/permission/of/messages", null, {
      headers: {
        Authorization: "Bearer " + requiredData?.Authorization,
      },
      params: {
        status: requiredData?.status,
        visible_conversation_id: requiredData?.conversationId,
        userId: requiredData?.userId,
      },
    });
  }
};

export const useGetMessageOfParticularConversation = (requiredData) => {
  const dispatch = useDispatch();

  return useQuery(
    ["getMessagesOfParticularConversation", requiredData],
    () => getMessagesOfParticularConversation(requiredData),
    {
      onSuccess: (data) => {
        if (data?.status === 200) {
          data?.data?.data?.map((messages) =>
            dispatch(set_all_messages(messages))
          );
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
  const dispatch = useDispatch();

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
            (profilePics) => {
              const all_data = {
                profilePic: profilePics?.profile_details?.at(0)?.urls,
                userName: profilePics?.userName,
                userId: profilePics?.userId,
                conversationDetails: data?.data?.data?.conversation_data?.map(
                  (conversation) => {
                    const all_conversation_data = {
                      visibleConversationId:
                        conversation?.user_conversations?.at(0)
                          ?.visibleConversationId,
                      receiverUserId: conversation?.receiverUserId,
                      status: conversation?.status,
                    };
                    return all_conversation_data;
                  }
                ),
              };
              return all_data;
            }
          );
          dispatch(set_all_conversations(wholeData));
        } else {
          dispatch(set_all_conversations(null));
        }
      },
      refetchOnMount: false,
      enabled: false,
      retry: 5,
      retryDelay: 1000,
    }
  );
};

export const useGet_all_conversations_request_of_specific_user = (
  requiredData
) => {
  const dispatch = useDispatch();

  return useQuery(
    ["get_all_conversations_request_of_specific_user", requiredData],
    () => get_all_conversations_request_of_specific_user(requiredData),
    {
      onError: (error) => {
        console.log(error?.response?.data?.message);
      },
      onSuccess: (data) => {
        if (data?.status === 200) {
          const wholeData = data?.data?.data?.profile_pics_data?.results?.map(
            (profilePics) => {
              const all_data = {
                profilePic: profilePics?.profile_details?.at(0)?.urls,
                userName: profilePics?.userName,
                userId: profilePics?.userId,
                conversationDetails: data?.data?.data?.conversation_data?.map(
                  (conversation) => {
                    const all_conversation_data = {
                      visibleConversationId:
                        conversation?.user_conversations?.at(0)
                          ?.visibleConversationId,
                      receiverUserId: conversation?.receiverUserId,
                      status: conversation?.status,
                    };
                    return all_conversation_data;
                  }
                ),
              };
              return all_data;
            }
          );
          dispatch(set_all_conversation_requests(wholeData));
        } else {
          dispatch(set_all_conversation_requests(null));
        }
      },
      refetchOnMount: false,
      enabled: false,
      retry: 5,
      retryDelay: 1000,
    }
  );
};

export const useUpdate_user_conversation_request_permissions = () => {
  return useMutation(update_user_conversation_request_permissions, {
    onSuccess: (data) => {
      if (data?.status === 200) {
        console.log(data?.data?.data);
      }
    },
    onError: (error) => {
      console.log(error?.response?.data?.message);
    },
    retry: 5,
    retryDelay: 1000,
  });
};
