import axios from "axios";
import { useMutation } from "react-query";

const URLs = () => {
  return axios.create({
    baseURL: "http://localhost:9999/ai/socialmedia/api/v1/private/profile",
  });
};

const uploadProfilePic = (formData) => {
  return URLs().post("/create/profilepics", formData?.file, {
    headers: {
      Authorization: "Bearer " + formData?.Authorization,
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
