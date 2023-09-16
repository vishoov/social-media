import axios from "axios";
import { useQuery } from "react-query";
import { useContext } from "react";
import { Context as HomeContext } from "../../context/HomeContext";
import { Context as NotificationsContext } from "../../context/NotificationContext";
import {
  setAbnormalError,
  setMemoryNotFoundError,
} from "../../redux/SocialMediaMemoriesSlice";

// base urls
const url = () => {
  return axios.create({
    baseURL: "http://localhost:9999/ai/socialmedia/api/v1/private/memory",
  });
};

const getMemoriesWithinAWeek = (data) => {
  if (data !== null && data !== undefined) {
    return url().get("/get/memories/between", {
      headers: {
        Authorization: "Bearer " + data?.Authorization,
      },
    });
  }
};

export const useGetMemoriesWithinAWeek = (requiredData) => {
  const { setHomeMemoriesContentWithApiCall } = useContext(HomeContext);
  const { setMemoriesNotificationsUsingApi } = useContext(NotificationsContext);

  return useQuery(
    ["getMemoriesWithinAWeek", requiredData],
    () => getMemoriesWithinAWeek(requiredData),
    {
      onSuccess: (data) => {
        if (data?.status === 200) {
          var wholeData = data?.data?.data?.results?.map((item) => {
            var memories = {
              feelings: item?.memory_details?.feelings,
              urls: item?.memory_details?.urls?.at(0),
              profileUrl: item?.profilePicsData?.results
                ?.at(0)
                ?.profile_details?.at(0)
                ?.urls?.at(0),
              userName: item?.userName,
              created: item?.memory_details?.created,
            };
            return memories;
          });

          setHomeMemoriesContentWithApiCall(wholeData);
          setMemoriesNotificationsUsingApi(wholeData);
        } else {
          setMemoryNotFoundError(data?.data?.message);
        }
      },
      onError: (error) => {
        setAbnormalError(error?.response?.data?.message);
      },
      retryOnMount: false,
      enabled: !!requiredData,
      retry: 5,
      retryDelay: 2000,
    }
  );
};
