import axios from "axios";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setSocialMediaUserData,
  setSocialMediaUserError,
} from "../../redux/SocialMediaUserSlice";
import { useGetProfileDetails } from "./SocialMediaProfileInterfaceAPI";
import { useCookies } from "react-cookie";

const URLs = () => {
  return axios.create({
    baseURL:
      "http://localhost:9999/ai/socialmedia/api/v1/private/socialmediausers",
  });
};

const addSocialMediaUser = (data) => {
  return URLs().post("/addsocialmediauser", data?.data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer ".concat(data?.Authorization),
    },
  });
};

export const useAddSocialMediaUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookies] = useCookies(["avt_token"]);
  const { data: profileData } = useGetProfileDetails({
    Authorization: cookies?.avt_token,
  });

  return useMutation(addSocialMediaUser, {
    onSuccess: (data) => {
      if (
        data?.data?.data?.socialMediaUserId !== null &&
        data?.data?.data?.socialMediaUserId !== undefined
      ) {
        dispatch(setSocialMediaUserData(profileData?.data?.data));

        localStorage.setItem("sm_user_id", data?.data?.data?.socialMediaUserId);

        navigate("/environment/socialMedia/home");
      } else {
        dispatch(setSocialMediaUserError("invalid credentials"));

        navigate("/environment/socialMedia/activate");
      }
    },
    onError: (error) => {
      dispatch(setSocialMediaUserError(error?.response?.data?.message));
    },
  });
};
