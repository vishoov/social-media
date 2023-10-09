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

import {
  setFollowersCount,
  setFollowingsCount,
  setFollowingsWithProfile,
  setFollowersWithProfile,
} from "../../reduxNonPersist/NonPersistProfileSlice";

// base urls

const URLs = () => {
  return axios.create({
    baseURL: `${process.env.REACT_APP_API_HOST_NAME}/ai/socialmedia/api/v1/private/profile`,
  });
};

const url1 = () => {
  return axios.create({
    baseURL: `${process.env.REACT_APP_API_HOST_NAME}/ai/environment/api/v1/public/user`,
  });
};

const followersUrl = () => {
  return axios.create({
    baseURL: `${process.env.REACT_APP_API_HOST_NAME}/ai/socialmedia/api/v1/private/followers`,
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

const getFollowingsWithProfilePics = (userData) => {
  if (userData?.Authorization && userData?.userId) {
    return followersUrl().get("/get/all/followings/with/profilepics", {
      headers: {
        Authorization: "Bearer " + userData?.Authorization,
      },
      params: {
        userId: userData?.userId,
      },
    });
  }
};

const getFollowersWithProfilePics = (profile) => {
  if (profile?.Authorization && profile?.userId) {
    return followersUrl().get("/get/all/followers/with/profilepics", {
      headers: {
        Authorization: "Bearer " + profile?.Authorization,
      },
      params: {
        userId: profile?.userId,
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

export const useGetFollowingsWithProfilePics = (userData) => {
  const dispatch = useDispatch();

  return useQuery(
    ["getFollowingsWithProfilePics", userData],
    () => getFollowingsWithProfilePics(userData),
    {
      onSuccess: (success) => {
        if (success?.status === 200) {
          var wholeData = success?.data?.data?.results?.map((item) =>
            item?.profile_details?.map((ithData) => {
              return {
                userName: item?.userName,
                profileUrl: ithData?.urls.at(0),
              };
            })
          );

          console.log("whole data", wholeData);

          dispatch(setFollowingsWithProfile(wholeData));
        } else {
          dispatch(setFollowingsWithProfile([]));
        }
      },
      onError: (error) => {
        dispatch(setFollowingsWithProfile([]));
      },
      refetchOnMount: false,
      enabled: false,
      retry: 5,
      retryDelay: 1000,
    }
  );
};

export const useGetFollowersWithProfilePics = (userData) => {
  const dispatch = useDispatch();

  return useQuery(
    ["getFollowingsWithProfilePics", userData],
    () => getFollowersWithProfilePics(userData),
    {
      onSuccess: (success) => {
        if (success?.status === 200) {
          var wholeData = success?.data?.data?.results?.map((item) =>
            item?.profile_details?.map((ithData) => {
              return {
                userName: item?.userName,
                profileUrl: ithData?.urls.at(0),
              };
            })
          );

          console.log("whole data", wholeData);

          dispatch(setFollowersWithProfile(wholeData));
        } else {
          dispatch(setFollowersWithProfile([]));
        }
      },
      onError: (error) => {
        dispatch(setFollowersWithProfile([]));
      },
      refetchOnMount: false,
      enabled: false,
      retry: 5,
      retryDelay: 1000,
    }
  );
};

export const useGetFollowers = (userData) => {
  const dispatch = useDispatch();

  return useQuery(
    ["getFollowersOfUser", userData],
    () => getFollowersOfUser(userData),
    {
      onSuccess: (success) => {
        if (success?.status === 200) {
          dispatch(
            setFollowersCount(
              success?.data?.data?.followers?.followersData?.length
            )
          );
        } else {
          dispatch(setFollowersCount(0));
        }
      },
      onError: (error) => {},
      refetchOnMount: false,
      enabled: false,
      retry: 5,
      retryDelay: 1000,
    }
  );
};

export const useGetFollowings = (userData) => {
  const dispatch = useDispatch();

  return useQuery(
    ["getFollowingsOfUser", userData],
    () => getFollowingsOfUser(userData),
    {
      onSuccess: (success) => {
        if (success?.status === 200) {
          dispatch(
            setFollowingsCount(
              success?.data?.data?.following?.followingsData?.length
            )
          );
        } else {
          dispatch(setFollowingsCount(0));
        }
      },
      onError: (error) => {},
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
