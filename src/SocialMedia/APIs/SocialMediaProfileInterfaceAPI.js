import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { setSocialMediaUserData } from "../../redux/SocialMediaUserSlice";
import { useDispatch } from "react-redux";
import { OTHER_ERROR, USER_DETAILS } from "../../redux/AuthSlice";
import { setIsFollowing } from "../../redux/SearchSlice";
import {
  setProfilePicUploadError,
  setProfileUserPersonalDataError,
} from "../../redux/ProfileSlice";
import { useContext } from "react";
import { Context as profileContext } from "../../context/ProfileContext";

// base urls

const URLs = () => {
  return axios.create({
    baseURL: "http://localhost:9999/ai/socialmedia/api/v1/private/profile",
  });
};

const url1 = () => {
  return axios.create({
    baseURL: "http://localhost:9999/ai/environment/api/v1/public/user",
  });
};

const followersUrl = () => {
  return axios.create({
    baseURL: "http://localhost:9999/ai/socialmedia/api/v1/private/followers",
  });
};

// methods

const getUserData = (userData) => {
  if (userData?.Authorization && userData?.searchField) {
    return url1().get("/get/userBySearchField", {
      headers: {
        Authorization: "Bearer " + userData?.Authorization,
      },
      params: {
        searchField: userData?.searchField,
      },
    });
  }
};

const getFollowersOfUser = (userData) => {
  if (userData?.userId && userData?.Authorization) {
    return followersUrl().get("/get/allfollowers", {
      headers: {
        Authorization: "Bearer " + userData?.Authorization,
      },
      params: {
        userId: userData?.userId,
      },
    });
  }
};

const getFollowingsOfUser = (userData) => {
  if (userData?.Authorization && userData?.userId) {
    return followersUrl().get("/get/allfollowings", {
      headers: {
        Authorization: "Bearer " + userData?.Authorization,
      },
      params: {
        userId: userData?.userId,
      },
    });
  }
};

const uploadProfilePic = (formData) => {
  if (formData?.file && formData?.Authorization) {
    return URLs().post("/create/profilepics", formData?.file, {
      headers: {
        Authorization: "Bearer " + formData?.Authorization,
      },
    });
  }
};

const getProfileDetails = (formData) => {
  if (formData?.Authorization) {
    return url1().get("/get/userbyjwt", {
      headers: {
        Authorization: "Bearer " + formData?.Authorization,
      },
    });
  }
};

const followSomeone = (formData) => {
  if (formData?.data && formData?.Authorization) {
    return followersUrl().post("/addfollowerandfollowing", formData?.data, {
      headers: {
        Authorization: "Bearer " + formData?.Authorization,
      },
    });
  }
};

// hooks

export const useGetFollowers = (userData) => {
  const { setFollowersCount, setFollowersCountError } =
    useContext(profileContext);

  return useQuery(
    ["getFollowersOfUser", userData],
    () => getFollowersOfUser(userData),
    {
      onSuccess: (success) => {
        if (success?.status === 200) {
          setFollowersCount(
            success?.data?.data?.followers?.followersData?.length
          );
        } else {
          setFollowersCount(0);
        }
      },
      onError: (error) => {
        setFollowersCountError(error?.response?.data?.message);
      },
      refetchOnMount: false,
      enabled: false,
      retry: 5,
      retryDelay: 1000,
    }
  );
};

export const useGetFollowings = (userData) => {
  const { setFollowingsCount, setFollowingsCountError } =
    useContext(profileContext);

  return useQuery(
    ["getFollowingsOfUser", userData],
    () => getFollowingsOfUser(userData),
    {
      onSuccess: (success) => {
        console.log("success in followings :", success?.data);

        if (success?.status === 200) {
          setFollowingsCount(
            success?.data?.data?.following?.followingsData?.length
          );
        } else {
          setFollowingsCount(0);
        }
      },
      onError: (error) => {
        setFollowingsCountError(error?.response?.data?.message);
      },
      refetchOnMount: false,
      enabled: false,
      retry: 5,
      retryDelay: 1000,
    }
  );
};

export const useGetUserDataInProfile = (userData) => {
  const dispatch = useDispatch();

  return useQuery(["getUserData", userData], () => getUserData(userData), {
    onError: (error) => {
      dispatch(OTHER_ERROR(error));
    },
    onSuccess: (data) => {
      if (data?.status === 202) {
        dispatch(OTHER_ERROR(data?.data?.message));
      } else {
        dispatch(USER_DETAILS(data?.data?.data));
      }
    },
    retry: 5,
    retryDelay: 1000,
    refetchOnMount: false,
    enabled: false,
  });
};

export const useFollowPerson = () => {
  const dispatch = useDispatch();

  return useMutation(followSomeone, {
    onSuccess: (data) => {
      if (data?.status === 200) {
        console.log("Success in following people!!!");
        dispatch(setIsFollowing(true));
      } else {
        dispatch(setIsFollowing(false));
      }
    },
  });
};

export const useUploadProfilePics = () => {
  const dispatch = useDispatch();
  return useMutation(uploadProfilePic, {
    onError: (error) => {
      dispatch(setProfilePicUploadError(error?.response?.data?.message));
    },
  });
};

export const useGetProfileDetails = (formData) => {
  const dispatch = useDispatch();

  return useQuery(
    ["getProfileDetails", formData],
    () => getProfileDetails(formData),
    {
      onError: (error) => {
        dispatch(
          setProfileUserPersonalDataError(error?.response?.data?.message)
        );
      },
      onSuccess: (data) => {
        if (data?.status === 200) {
          dispatch(setSocialMediaUserData(data?.data?.data));
        }
      },
      refetchOnMount: false,
      enabled: false,
      retry: 5,
      retryDelay: 1000,
    }
  );
};
