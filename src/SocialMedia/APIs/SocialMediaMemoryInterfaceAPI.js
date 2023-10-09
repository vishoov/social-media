import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { useDispatch } from "react-redux";
import {
  setAbnormalError,
  setMemoryCreationError,
  setMemoryNotFoundError,
  setMemoryNotFoundForOtherUserError,
} from "../../redux/SocialMediaMemoriesSlice";
import {
  setMemoryCount,
  setSocialMediaMemories,
  setSocialMediaMemoriesOfAnotherUser,
} from "../../reduxNonPersist/NonPersistMemoriesSlice";

const urls = () => {
  return axios.create({
    baseURL: `${process.env.REACT_APP_API_HOST_NAME}/ai/socialmedia/api/v1/private/memory`,
  });
};

const shareMemory = (memoryData) => {
  if (memoryData?.fileData && memoryData?.Authorization) {
    return urls().post("/share", memoryData?.fileData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + memoryData?.Authorization,
      },
    });
  }
};

const getAllMemories = (memoryData) => {
  if (memoryData?.userId && memoryData?.Authorization) {
    return urls().get("/get/allof/lazy", {
      params: {
        userId: memoryData?.userId,
        pageNumber: memoryData?.pageNumber,
      },
      headers: {
        Authorization: "Bearer " + memoryData?.Authorization,
      },
    });
  }
};

const getMemoryCount = (memoryData) => {
  if (memoryData?.userId && memoryData?.Authorization) {
    return urls().get("/get/memories/count", {
      params: {
        userId: memoryData?.userId,
      },
      headers: {
        Authorization: "Bearer " + memoryData?.Authorization,
      },
    });
  }
};

export const useShareMemory = () => {
  const dispatch = useDispatch();

  return useMutation(shareMemory, {
    onError: (error) => {
      dispatch(setMemoryCreationError(error?.response?.data?.message));
    },
  });
};

export const useGetAllMemories = (memoryData) => {
  const dispatch = useDispatch();

  return useQuery(
    ["getAllMemories", memoryData],
    () => getAllMemories(memoryData),
    {
      onError: (error) => {
        dispatch(setAbnormalError(error?.response?.data?.message));
      },
      onSuccess: (data) => {
        if (data?.status === 200 && data?.data?.data?.results?.length > 0) {
          var wholeData = data?.data?.data?.results?.map((memories) => {
            var memory_details = {
              urls: memories?.memory_details?.urls?.at(0),
              feelings: memories?.memory_details?.feelings,
            };
            return memory_details;
          });

          localStorage.setItem("done", true);

          dispatch(setSocialMediaMemories(wholeData));
          dispatch(setMemoryNotFoundError(null));
        } else {
          dispatch(setMemoryNotFoundError(data?.data?.message));
        }
      },
      refetchOnMount: false,
      enabled: false,
      retry: 5,
      retryDelay: 1000,
    }
  );
};

export const useGetMemoriesCount = (memoryData) => {
  const dispatch = useDispatch();
  return useQuery(
    ["getMemoryCount", memoryData],
    () => getMemoryCount(memoryData),
    {
      onError: (error) => {
        dispatch(setAbnormalError(error?.response?.data?.message));
      },
      onSuccess: (data) => {
        if (data?.status === 200) {
          dispatch(setMemoryCount(data?.data?.data));
        } else {
          dispatch(setMemoryCount(0));
        }
      },
      refetchOnMount: false,
      enabled: false,
      retry: 5,
      retryDelay: 1000,
    }
  );
};

export const useGetAllMemoriesForOtherUser = (memoryData) => {
  const dispatch = useDispatch();

  return useQuery(
    ["getAllMemories", memoryData],
    () => getAllMemories(memoryData),
    {
      onError: (error) => {
        dispatch(setAbnormalError(error?.response?.data?.message));
      },
      onSuccess: (data) => {
        console.log("sucessfully data :", data?.data?.data);
        if (data?.status === 200 && data?.data?.data?.results?.length > 0) {
          var wholeData = data?.data?.data?.results?.map((memories) => {
            var memory_details = {
              urls: memories?.memory_details?.urls?.at(0),
              feelings: memories?.memory_details?.feelings,
            };
            return memory_details;
          });

          dispatch(setSocialMediaMemoriesOfAnotherUser(wholeData));
          dispatch(setMemoryNotFoundForOtherUserError(null));
        } else {
          dispatch(setMemoryNotFoundForOtherUserError(data?.data?.message));
        }
      },
      refetchOnMount: false,
      enabled: false,
      retry: 5,
      retryDelay: 1000,
    }
  );
};
