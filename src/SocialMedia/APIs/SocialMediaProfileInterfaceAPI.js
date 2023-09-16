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
  return url1().get("/get/userBySearchField", {
    headers: {
      Authorization: "Bearer " + userData?.Authorization,
    },
    params: {
      searchField: userData?.searchField,
    },
  });
};

const uploadProfilePic = (formData) => {
  return URLs().post("/create/profilepics", formData?.file, {
    headers: {
      Authorization: "Bearer " + formData?.Authorization,
    },
  });
};

const getProfileDetails = (formData) => {
  return url1().get("/get/userbyjwt", {
    headers: {
      Authorization: "Bearer " + formData?.Authorization,
    },
  });
};

const followSomeone = (formData) => {
  return followersUrl().post("/addfollowerandfollowing", formData?.data, {
    headers: {
      Authorization: "Bearer " + formData?.Authorization,
    },
  });
};

// hooks

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
    enabled: !!userData,
  });
};

export const useFollowPerson = () => {
  const dispatch = useDispatch();

  return useMutation(followSomeone, {
    onSuccess: (data) => {
      if (data?.status === 200) {
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
      enabled: !!formData,
      retry: 5,
      retryDelay: 1000,
    }
  );
};
