import axios from "axios";
import { useMutation } from "react-query";
import {
  DO_SIGNIN,
  DO_SIGNUP,
  OTHER_ERROR,
  USER_DETAILS,
} from "../../redux/AuthSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { addAuthData, deleteAuthData } from "../../IndexDB";
import { useContext } from "react";
import { Context as UserContext } from "../../context/UserContext";

const URLs = () => {
  return axios.create({
    baseURL: "http://localhost:9999/ai/environment/api/v1/public/user",
  });
};

// const userVerificationForgotPassword = (user) => {
//   return URLs().post("/forgotPassword/apply", user);
// };

// useVerifyUserDataForgotPassword hooks
// export const useUserVerificationForgotPassword = (data) => {
// return useQuery("authUser", () => userVerificationForgotPassword(data), {
//   refetchOnMount: false,
//   enabled: !!data,
//   retry: 5,
//   retryDelay: 10000,
//   onSuccess: (data) => {
//     return data;
//   },
//   onError: (error) => {
//     return error;
//   },
// });

// };

// helper methods

const addUserData = (user) => {
  return URLs().post("/signup", user);
};

const verifyUserData = (user) => {
  return URLs().post("/signin", user);
};

const GenerateLink = (data) => {
  return URLs().post("/forgotPassword/apply", data);
};

const changePassword = (data) => {
  return URLs().put("/changePassword", data);
};

// hooks

// useAddUserData hooks
export const useAddUserData = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [, setCookie] = useCookies(["avt_token"]);
  const { setSignUpError, setShouldSpeak } = useContext(UserContext);

  return useMutation(addUserData, {
    onSuccess: (data) => {
      if (data?.status === 200) {
        dispatch(DO_SIGNUP(data?.data?.data));

        setCookie("avt_token", data?.data?.data?.jwtToken, {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        });
        navigate("/environment/home");
        setShouldSpeak(true);
      } else {
        setSignUpError("email already in use");
      }
    },
    onError: (error) => {
      if (error?.response?.status === 500) {
        setSignUpError(error?.response?.data?.message);
      }
    },
    retry: 5,
    retryDelay: 10000,
  });
};

// useVerifyUserData hooks
export const useVerifyUserData = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [, setCookie] = useCookies(["avt_token"]);
  const { setSignInError } = useContext(UserContext);

  return useMutation(verifyUserData, {
    onSuccess: (data) => {
      if (data?.status === 200) {
        dispatch(DO_SIGNIN(data?.data?.data));

        setCookie("avt_token", data?.data?.data?.jwtToken, {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        });
        navigate("/environment/home", {
          state: {
            data: true,
          },
        });
      } else {
        setSignInError("invalid username or password");
      }
    },
    onError: (error) => {
      if (error?.response?.status === 400) {
        setSignInError("invalid username or password");
      } else if (error.response?.status === 503) {
        setSignInError("service unavailable");
      } else {
        setSignInError(error?.response?.data?.message);
      }
    },
  });
};

// useGenerateCode hooks

export const useGenerateLink = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [, setCookie] = useCookies(["sf_f_c_p_code"]);

  return useMutation(GenerateLink, {
    onSuccess: async (data) => {
      if (data?.data?.error === "USER_NOT_FOUND") {
        dispatch(OTHER_ERROR("invalid username or email!"));
      } else {
        dispatch(USER_DETAILS(data.data.data));

        const code = await addAuthData({ value: data.data.data.searchField });

        setCookie(
          "sf_f_c_p_code",
          { value: code },
          {
            path: "/",
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
          }
        );

        navigate("/environment/wait/reset");
      }
    },
    onError: (error) => {
      dispatch(OTHER_ERROR(error));
    },
    retry: 5,
    retryDelay: 10000,
  });
};

export const useChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["sf_f_c_p_code"]);

  return useMutation(changePassword, {
    onSuccess: async (data) => {
      if (
        data?.data.error === "PASSWORD_AND_CONFIRM_PASSWORD_MUST_BE_IDENTICAL"
      ) {
        dispatch(
          OTHER_ERROR("password and confirm password must be identical!")
        );
      } else {
        if (
          cookies.sf_f_c_p_code !== undefined &&
          cookies.sf_f_c_p_code.value !== null
        ) {
          await deleteAuthData(cookies.sf_f_c_p_code.value);
          setCookie("sf_f_c_p_code", null, {
            path: "/",
            maxAge: 0,
          });
          navigate("/environment/signin");
        }
      }
    },
    onError: (error) => {
      dispatch(OTHER_ERROR(error));
    },
    retry: 5,
    retryDelay: 10000,
  });
};
