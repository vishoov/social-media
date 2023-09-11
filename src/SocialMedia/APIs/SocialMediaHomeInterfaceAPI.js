import axios from "axios";
import { useQuery } from "react-query";
import {
  setHomeMemoriesContentError,
  setHomeMemoriesContentWithApiCall,
} from "../../redux/SocialMediaHomeSlice";
import { useDispatch } from "react-redux";

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
            };
            return memories;
          });

          dispatch(setHomeMemoriesContentWithApiCall(wholeData));
        } else {
          dispatch(setHomeMemoriesContentError(data?.data?.message));
        }
      },
      onError: (error) => {
        alert(error);
      },
      retryOnMount: false,
      enabled: !!requiredData,
      retry: 5,
      retryDelay: 2000,
    }
  );
};
