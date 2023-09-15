import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { setSocialMediaUserData } from "../../redux/SocialMediaUserSlice";
import { useDispatch } from "react-redux";
import { OTHER_ERROR, USER_DETAILS } from "../../redux/AuthSlice";
import { setIsFollowing } from "../../redux/SearchSlice";

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
  console.log("hey form", formData);

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
      console.log("error ::::", error);
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
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      console.log("status code :", data?.status);
      if (data?.status === 200) {
        dispatch(setIsFollowing(true));
      } else {
        alert("not found!!!");
      }
    },
  });
};

export const useUploadProfilePics = () => {
  return useMutation(uploadProfilePic, {
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useGetProfileDetails = (formData) => {
  const dispatch = useDispatch();

  console.log("form data :", formData);

  return useQuery(
    ["getProfileDetails", formData],
    () => getProfileDetails(formData),
    {
      onError: (error) => {
        console.log(error);
      },
      onSuccess: (data) => {
        if (data?.data?.data !== null || data?.data?.data !== undefined) {
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
