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
    onError: (error) => {
      alert(error.message);
    },
  });
};

export const useGetUserBySearch = () => {
  const dispatch = useDispatch();

  return useMutation(getUserBySearch, {
    onError: (error) => {
      console.log(error);
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
  // const navigate = useNavigate();
  // const socialMediaUser = useSelector((state) => state.socialMediaUser);

  return useMutation(getUserProfileInfo, {
    onError: (error) => {
      if (error?.response?.status === 404) {
        dispatch(setRequestedUserSearchError(error?.response?.data?.message));
      } else {
        dispatch(setRequestedUserSearchError("no memories are available"));
      }
    },
    // onSuccess: (data) => {
    //   if (data?.status === 200) {
    //     dispatch(setRequestUserSearchData(data?.data?.data));
    //     if (
    //       data?.data?.data?.userPersonalDetails?.userName ===
    //       socialMediaUser?.value?.SocialMediaUserData?.userName
    //     ) {
    //       navigate("/environment/socialMedia/profile");
    //     } else {
    //       navigate(
    //         `/environment/socialMedia/profile/${data?.data?.data?.userPersonalDetails?.userName}`,
    //         {
    //           state: {
    //             data: true,
    //           },
    //         }
    //       );
    //     }
    //   } else {
    //     dispatch(setRequestUserSearchData(data?.data?.message));
    //   }
    // },
  });
};
