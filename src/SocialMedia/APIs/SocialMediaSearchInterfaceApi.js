import axios from "axios";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { setSearchDataError } from "../../redux/SearchSlice";
import { setRequestedUserSearchError } from "../../redux/SearchSlice";
import { setSearchData } from "../../reduxNonPersist/NonPersistSearchSlice";
import { Context as SearchContext } from "../../context/SearchContext";
import { useContext } from "react";

const urls = () => {
  return axios.create({
    baseURL: `${process.env.REACT_APP_API_HOST_NAME}/ai/socialmedia/api/v1/private/search`,
  });
};

const urls1 = () => {
  return axios.create({
    baseURL: `${process.env.REACT_APP_API_HOST_NAME}/ai/socialmedia/api/v1/private/customjoin`,
  });
};

const followersURL = () => {
  return axios.create({
    baseURL: `${process.env.REACT_APP_API_HOST_NAME}/ai/socialmedia/api/v1/private/followers`,
  });
};

const getUserBySearch = (searchdata) => {
  if (searchdata?.Authorization && searchdata?.search) {
    return urls().post("/get/user/bysearchkeyword", null, {
      headers: {
        Authorization: "Bearer " + searchdata?.Authorization,
      },
      params: {
        search: searchdata?.search,
      },
    });
  }
};

const getUserProfileInfo = (searchdata) => {
  if (searchdata?.Authorization && searchdata?.username) {
    return urls1().post("/userdetailswithmemories", null, {
      headers: {
        Authorization: "Bearer " + searchdata?.Authorization,
      },
      params: {
        username: searchdata?.username,
      },
    });
  }
};

const checkIsUserFollowingTheOtherUser = (user) => {
  if (user?.followingdata && user?.Authorization) {
    return followersURL().post("/check/isfollowing", user?.followingdata, {
      headers: {
        Authorization: "Bearer " + user?.Authorization,
      },
    });
  }
};

export const useCheckIsUserFollowingTheOtherUser = () => {
  return useMutation(checkIsUserFollowingTheOtherUser, {
    retry: 5,
    retryDelay: 1000,
  });
};

export const useGetUserBySearch = () => {
  const dispatch = useDispatch();

  return useMutation(getUserBySearch, {
    onError: (error) => {
      dispatch(setSearchDataError(error));
    },
    onSuccess: (data) => {
      const empty = [];

      if (data?.status === 202) {
        setSearchData(empty);
      } else {
        const wholeData = data?.data?.data?.results?.map((item) => {
          const newJson = {
            userName: item?.userName,
            profilePic: item?.profile_details?.at(0)?.urls?.at(0),
          };
          return newJson;
        });

        dispatch(setSearchData(wholeData));
      }
    },
  });
};

export const useGetUserBySearchForMessages = () => {
  const dispatch = useDispatch();

  const { setSearchDataForMessages } = useContext(SearchContext);

  return useMutation(getUserBySearch, {
    onError: (error) => {
      dispatch(setSearchDataError(error));
    },
    onSuccess: (data) => {
      const empty = [];
      if (data?.status === 202) {
        setSearchDataForMessages(empty);
      } else {
        const wholeData = data?.data?.data?.results?.map((item) => {
          const newJson = {
            userName: item?.userName,
            profilePic: item?.profile_details?.at(0)?.urls?.at(0),
            userId: item?.userId,
          };
          return newJson;
        });

        setSearchDataForMessages(wholeData);
      }
    },
  });
};

export const useGetUserProfileInfo = () => {
  const dispatch = useDispatch();

  return useMutation(getUserProfileInfo, {
    onError: (error) => {
      if (error?.response?.status === 404) {
        dispatch(setRequestedUserSearchError(error?.response?.data?.message));
      } else {
        dispatch(setRequestedUserSearchError("no memories are available"));
      }
    },
  });
};
