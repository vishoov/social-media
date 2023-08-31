import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { setSocialMediaUserData } from "../../redux/SocialMediaUserSlice";
import { useDispatch } from "react-redux";

const URLs = () => {
  return axios.create({
    baseURL: "http://localhost:9999/ai/socialmedia/api/v1/private/profile",
  });
};

const urls1 = () => {
  return axios.create({
    baseURL: "http://localhost:9999/ai/environment/api/v1/public/user",
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
  return urls1().get("/get/userbyjwt", {
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

export const useGetProfileDetails = (formData) => {
  const dispatch = useDispatch();

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
