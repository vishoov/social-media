import axios from "axios";
import { useQuery } from "react-query";

const URLs = () => {
  return axios.create({
    baseURL:
      "http://localhost:9999/ai/intermediateinterface/api/v1/private/activationkey",
  });
};

const getActivationKey = (userData) => {
  return URLs().get("/get/requesteduser", {
    params: {
      userId: userData?.user_id,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + userData?.Authorization,
    },
  });
};

export const useGetActivationKey = (userData) => {
  return useQuery(
    ["getActivationKey", userData],
    () => getActivationKey(userData),
    {
      refetchOnMount: false,
      enabled: !!userData,
      retry: 5,
      retryDelay: 1000,
      onSuccess: (data) => {
        if (data?.status === 200) {
          localStorage.setItem(
            "soc_ak_code",
            data?.data?.data?.socialMediaActivationKey
          );
        }
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );
};
