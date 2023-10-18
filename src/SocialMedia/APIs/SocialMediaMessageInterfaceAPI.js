import axios from "axios";

import { useMutation, useQuery } from "react-query";

import { useDispatch } from "react-redux";
import { set_all_messages } from "../../reduxNonPersist/NonPersistMessages";
import {
  set_all_conversations,
  set_all_conversation_requests,
} from "../../reduxNonPersist/NonPersistConversationSlice";
import { useNavigate } from "react-router-dom";
import { setSelectedGroup } from "../../redux/MessageSlice";

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

const url2 = () => {
  return axios.create({
    baseURL: `${process.env.REACT_APP_API_HOST_NAME}/ai/socialmedia/api/v1/private/group/conversation`,
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

const save_group_details = (requiredData) => {
  if (requiredData?.Authorization && requiredData?.group_details) {
    return url2().post("/save", requiredData?.group_details, {
      headers: {
        Authorization: "Bearer " + requiredData?.Authorization,
      },
    });
  }
};

const update_group_details = (requiredData) => {
  if (requiredData.Authorization && requiredData?.data) {
    return url2().put("/update", requiredData?.data, {
      headers: {
        Authorization: "Bearer " + requiredData?.Authorization,
      },
    });
  }
};

const get_all_group_conversation = (requiredData) => {
  console.log("get_all_group_conversation", requiredData);
  if (requiredData?.Authorization && requiredData?.userId) {
    return url2().get("/get/all", {
      headers: {
        Authorization: "Bearer " + requiredData?.Authorization,
      },
      params: {
        userId: requiredData?.userId,
      },
    });
  }
};

// hooks

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

export const useSaveGroupDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation(save_group_details, {
    onSuccess: (data) => {
      if (data?.status === 200) {
        dispatch(setSelectedGroup(data?.data?.data));

        navigate(
          `/environment/socialMedia/message/group/${data?.data?.data?.visibleGroupConversationId}`
        );
      }
    },
    onError: (error) => {
      console.log(error?.response?.data?.message);
    },
  });
};

export const useUpdateGroupDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation(update_group_details, {
    onSuccess: (data) => {
      if (data?.status === 200) {
        console.log("successfully joined the group!!!", data?.data?.data);
        dispatch(setSelectedGroup(data?.data?.data));

        navigate(
          `/environment/socialMedia/message/group/${data?.data?.data?.visibleGroupConversationId}`
        );
      }
    },
    onError: (error) => {
      console.log(error?.response?.data?.message);
    },
  });
};

export const useGetAllGroupConversation = (requiredData) => {
  const dispatch = useDispatch();

  return useQuery(
    ["get_all_group_conversation", requiredData],
    () => get_all_group_conversation(requiredData),
    {
      onSuccess: (data) => {
        if (data?.status === 200) {
          var group_conversation_data = data?.data?.data?.results?.map(
            (group_conversation_data) => {
              return {
                groupName:
                  group_conversation_data?.user_group_conversation_details
                    ?.groupName,
                visibleGroupConversationId:
                  group_conversation_data?.user_group_conversation_details
                    ?.visibleGroupConversationId,
              };
            }
          );

          dispatch(set_all_conversations(group_conversation_data));
        }
      },
      onError: (error) => {
        console.log(error?.response?.data?.message);
      },
      enabled: false,
      refetchOnMount: false,
      retry: 5,
      retryDelay: 1000,
    }
  );
};
