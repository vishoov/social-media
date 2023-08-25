import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { setSocialMediaMemories } from "../../redux/SocialMediaMemoriesSlice";

const urls = () => {
  return axios.create({
    baseURL: "http://localhost:9999/ai/socialmedia/api/v1/private/memory",
  });
};

const shareMemory = (memoryData) => {
  return urls().post("/share", memoryData?.fileData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + memoryData?.Authorization,
    },
  });
};

const getAllMemories = (memoryData) => {
  return urls().get("/get/allof", {
    params: {
      userId: memoryData?.userId,
    },
    headers: {
      Authorization: "Bearer " + memoryData?.Authorization,
    },
  });
};

export const useShareMemory = () => {
  return useMutation(shareMemory, {
    onError: (error) => console.log(error),
    retry: 5,
    retryDelay: 1000,
  });
};

export const useGetAllMemories = (memoryData) => {
  console.log("hii buddy", memoryData);
  const dispatch = useDispatch();

  return useQuery(
    ["getAllMemories", memoryData],
    () => getAllMemories(memoryData),
    {
      onError: (error) => console.log(error),
      onSuccess: (data) => {
        localStorage.setItem("done", true);
        dispatch(
          setSocialMediaMemories(
            data?.data?.data?.results?.map((memory) =>
              memory?.memory_details?.map((urls) => urls?.urls?.at(0))
            )
          )
        );
      },
      refetchOnMount: false,
      enabled: !!memoryData,
      retry: 5,
      retryDelay: 1000,
    }
  );
};
