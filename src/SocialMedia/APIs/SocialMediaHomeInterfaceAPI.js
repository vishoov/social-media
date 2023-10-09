import axios from "axios";
import { useQuery } from "react-query";
import {
  setAbnormalError,
  setMemoryNotFoundError,
} from "../../redux/SocialMediaMemoriesSlice";
import { useDispatch } from "react-redux";
import { setHomeMemoriesContentWithApiCall } from "../../reduxNonPersist/NonPersistForHomeSlice";
import { setMemoriesNotificationsUsingApi } from "../../reduxNonPersist/NonPersistNotificationSlice";

// base urls
const url = () => {
  return axios.create({
    baseURL: `${process.env.REACT_APP_API_HOST_NAME}/ai/socialmedia/api/v1/private/memory`,
  });
};

const getMemoriesWithinAWeek = (data) => {
  if (data?.Authorization) {
    return url().get("/get/memories/between", {
      headers: {
        Authorization: "Bearer " + data?.Authorization,
      },
    });
  }
};

export const useGetMemoriesWithinAWeek = (requiredData) => {
  const dispatch = useDispatch();

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

          dispatch(setHomeMemoriesContentWithApiCall(wholeData));

          dispatch(setMemoriesNotificationsUsingApi(wholeData));
          dispatch(setMemoryNotFoundError(null));
        } else {
          dispatch(setMemoryNotFoundError(data?.data?.message));
        }
      },
      onError: (error) => {
        setAbnormalError(error?.response?.data?.message);
      },
      retryOnMount: false,
      enabled: !!requiredData,
      retry: 3,
      retryDelay: 2000,
    }
  );
};
