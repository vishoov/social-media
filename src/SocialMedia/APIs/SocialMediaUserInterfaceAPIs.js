import axios from "axios";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context as UserContext } from "../../context/UserContext";

const URLs = () => {
  return axios.create({
    baseURL:
      "http://localhost:9999/ai/socialmedia/api/v1/private/socialmediausers",
  });
};

const addSocialMediaUser = (data) => {
  if (data?.data && data.Authorization) {
    return URLs().post("/addsocialmediauser", data?.data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer ".concat(data?.Authorization),
      },
    });
  }
};

export const useAddSocialMediaUser = () => {
  const navigate = useNavigate();

  const { setSocialMediaUserError } = useContext(UserContext);

  return useMutation(addSocialMediaUser, {
    onSuccess: (data) => {
      if (data?.status === 200) {
        localStorage.setItem("sm_user_id", data?.data?.data?.socialMediaUserId);

        navigate("/environment/socialMedia/home");
      } else {
        setSocialMediaUserError("invalid credentials");

        navigate("/environment/socialMedia/activate");
      }
    },
    onError: () => {
      setSocialMediaUserError("something went wrong");
    },
  });
};
