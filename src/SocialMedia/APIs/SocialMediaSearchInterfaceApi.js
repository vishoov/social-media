import axios from "axios";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { setSearchDataError, setSearchData } from "../../redux/SearchSlice";
import { setRequestedUserSearchError } from "../../redux/SearchSlice";

const urls = () => {
  return axios.create({
    baseURL: "http://localhost:9999/ai/socialmedia/api/v1/private/search",
  });
};

const urls1 = () => {
  return axios.create({
    baseURL: "http://localhost:9999/ai/socialmedia/api/v1/private/customjoin",
  });
};

const followersURL = () => {
  return axios.create({
    baseURL: "http://localhost:9999/ai/socialmedia/api/v1/private/followers",
  });
};

const getUserBySearch = (searchdata) => {
  return urls().post("/get/user/bysearchkeyword", null, {
    headers: {
      Authorization: "Bearer " + searchdata?.Authorization,
    },
    params: {
      search: searchdata?.search,
    },
  });
};

const getUserProfileInfo = (searchdata) => {
  return urls1().post("/userdetailswithmemories", null, {
    headers: {
      Authorization: "Bearer " + searchdata?.Authorization,
    },
    params: {
      username: searchdata?.username,
    },
  });
};

const checkIsUserFollowingTheOtherUser = (user) => {
  return followersURL().post("/check/isfollowing", user?.followingdata, {
    headers: {
      Authorization: "Bearer " + user?.Authorization,
    },
  });
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
        dispatch(setSearchData(empty));
      } else {
        dispatch(setSearchData(data?.data?.data));
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
