import axios from "axios";
import { useMutation, useQuery } from "react-query";
import {
  setAbnormalError,
  setMemoryNotFoundError,
} from "../../redux/SocialMediaMemoriesSlice";
import { useDispatch } from "react-redux";
import {
  setHomeMemoriesContentWithApiCall,
  setTracks,
} from "../../reduxNonPersist/NonPersistForHomeSlice";
import { setMemoriesNotificationsUsingApi } from "../../reduxNonPersist/NonPersistNotificationSlice";

// base urls
const url = () => {
  return axios.create({
    baseURL: `${process.env.REACT_APP_API_HOST_NAME}/ai/socialmedia/api/v1/private/memory`,
  });
};

const urlForTracks = () => {
  return axios.create({
    baseURL: `${process.env.REACT_APP_API_HOST_NAME}/ai/socialmedia/api/v1/private/tracks`,
  });
};

const likeUrl = () => {
  return axios.create({
    baseURL: `${process.env.REACT_APP_API_HOST_NAME}/ai/socialmedia/api/v1/private/likes`,
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

const get_all_tracks = (data) => {
  console.log("data for tracks  :::", data);

  if (data?.Authorization && data?.pageNumber) {
    return urlForTracks().get("/all/songs", {
      headers: {
        Authorization: "Bearer " + data?.Authorization,
      },
      params: {
        pageNumber: data?.pageNumber,
      },
    });
  }
};

const add_like_of_memory = (data) => {
  if (data?.likedata && data?.Authorization) {
    console.log("likedata :::", data?.likedata);
    return likeUrl().post("/add/to", data?.likedata, {
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
            return {
              memoryDetailsId: item?.memory_details?._id,
              feelings: item?.memory_details?.feelings,
              urls: item?.memory_details?.urls?.at(0),
              profileUrl: item?.profilePicsData?.results
                ?.at(0)
                ?.profile_details?.at(0)
                ?.urls?.at(0),
              userName: item?.userName,
              created: item?.memory_details?.created,
              userId: item?.userId,
              totalLikes: item?.memory_details?.totalLikes,
              likerUserIds: item?.likerUserId,
              isLiked: item?.isLiked,
            };
          });

          console.log("whole data for memories :---->", wholeData);

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
      enabled: false,
      retry: 3,
      retryDelay: 2000,
    }
  );
};

export const useGetAllTracks = (requiredData) => {
  const dispatch = useDispatch();

  return useQuery(
    ["getAllTracks", requiredData],
    () => get_all_tracks(requiredData),
    {
      onSuccess: (data) => {
        if (data?.status === 200) {
          console.log("all tracks...", data?.data?.data);
          data?.data?.data?.results?.map((track) => dispatch(setTracks(track)));
        }
      },
      onError: (error) => {
        console.log("error messages :::", error?.response?.data?.message);
      },
    }
  );
};

export const useAddMemoryLike = () => {
  return useMutation(add_like_of_memory, {
    onSuccess: (data) => {
      if (data?.status === 200) {
        console.log("like added", data?.data?.data);
      }
    },
    onError: (error) => {
      console.log("error messages :::", error?.response?.data?.message);
    },
  });
};
