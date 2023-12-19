import { useCallback, useEffect, useState } from "react";
import {
  useCheckIsUserFollowingTheOtherUser,
  useGetUserProfileInfo,
} from "../SocialMedia/APIs/SocialMediaSearchInterfaceApi";
import { useDispatch, useSelector } from "react-redux";
import useGetMemoriesCountHook from "./useGetMemoriesCountHook";
import useGetFollowersAndFollowingHook from "./useGetFollowersAndFollowingHook";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import {
  setIsFollowing,
  setRequestedUserSearchDataForPersist,
} from "../redux/SearchSlice";

import { setRequestUserSearchData } from "../reduxNonPersist/NonPersistSearchSlice";

const useNavigateByUsingUserName = (username) => {
  const { mutate: mutateUserProfile, data } = useGetUserProfileInfo();

  const [called, setCalled] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const socialMediaUser = useSelector((state) => state.socialMediaUser);
  const search = useSelector((state) => state.search);
  const [cookies] = useCookies(["avt_token"]);

  useGetMemoriesCountHook(search.requestedUserSearchdataForPersist?.userId);

  useGetFollowersAndFollowingHook(
    search.requestedUserSearchdataForPersist?.userId
  );
  const { mutate: mutateIsFollowing, data: responseData } =
    useCheckIsUserFollowingTheOtherUser();

  const handleNavigate = (username) => {
    if (username !== null) {
      if (username === socialMediaUser?.value?.SocialMediaUserData?.userName) {
        navigate("/environment/socialMedia/profile");
      } else {
        mutateUserProfile({
          username: username,
          Authorization: cookies?.avt_token,
        });
        dispatch(setIsFollowing(false));
      }
    }
  };

  const callBack = useCallback(() => {
    if (username) {
      handleNavigate(username);
    }
    // eslint-disable-next-line
  }, [username]);

  useEffect(() => {
    callBack();
  }, [callBack, username]);

  useEffect(() => {
    if (data?.status === 200) {
      dispatch(setRequestUserSearchData(data?.data?.data));

      if (called === false) {
        dispatch(
          setRequestedUserSearchDataForPersist(
            data?.data?.data?.userPersonalDetails
          )
        );
        mutateIsFollowing({
          Authorization: cookies?.avt_token,
          followingdata: {
            userId: localStorage.getItem("sm_user_id"),
            followingId: data?.data?.data?.userPersonalDetails?.userId,
          },
        });
      } else {
        setCalled(true);
      }
    }
    // eslint-disable-next-line
  }, [
    data?.status,
    data?.data?.data,
    socialMediaUser?.value?.SocialMediaUserData?.userName,
    mutateIsFollowing,
    called,
  ]);

  useEffect(() => {
    if (responseData?.status === 200) {
      dispatch(setIsFollowing(true));
      navigate(
        `/environment/socialMedia/profile/${data?.data?.data?.userPersonalDetails?.userName}`
      );
    } else if (responseData?.status === 202) {
      dispatch(setIsFollowing(false));
      navigate(
        `/environment/socialMedia/profile/${data?.data?.data?.userPersonalDetails?.userName}`
      );
    }
  }, [
    responseData?.data?.data,
    responseData?.status,
    data?.data?.data?.userPersonalDetails?.userName,
    dispatch,
    navigate,
  ]);
};

export default useNavigateByUsingUserName;
