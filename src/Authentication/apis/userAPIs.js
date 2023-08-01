import axios from "axios";
import { useMutation, useQuery } from "react-query";

const URLs = () => {
  return axios.create({
    baseURL: "http://localhost:9999/ai/environment/api/v1/public/user",
  });
};

const addUserData = (user) => {
  return URLs().post("/signup", user);
};

const verifyUserData = (user) => {
  return URLs().post("/signin", user);
};

const userVerificationForgotPassword = (user) => {
  if (user) {
    return URLs().get(`/get/userBySearchField?searchField=${user}`);
  }
};

const GenerateCode = (user) => {
  return URLs().post("/forgotPassword/apply", user);
};

// useAddUserData hooks
export const useAddUserData = () => {
  return useMutation(addUserData);
};

// useVerifyUserData hooks
export const useVerifyUserData = () => {
  return useMutation(verifyUserData);
};

// useVerifyUserDataForgotPassword hooks
export const useUserVerificationForgotPassword = (user) => {
  console.log(user);
  return useQuery("authUser", userVerificationForgotPassword(user), {
    refetchOnMount: false,
    enabled: false,
    retry: 5,
    retryDelay: 10000,
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      return error;
    },
  });
};

// useGenerateCode hooks

export const useGenerateCode = (user) => {
  return useMutation(GenerateCode);
};
