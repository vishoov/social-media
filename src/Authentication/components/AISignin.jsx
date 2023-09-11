import React, { useEffect } from "react";
import { AIInput } from "../../ReuseableComponents/AIInput";
import { useForm } from "react-hook-form";
import { Card } from "@mui/material";
import { AIButton } from "../../ReuseableComponents/AIButton";
import { useVerifyUserData } from "../apis/userAPIs";
import { useDispatch, useSelector } from "react-redux";
import { DO_SIGNIN, SIGNIN_ERROR } from "../../redux/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useCookies } from "react-cookie";

export const AISignin = () => {
  // useForm Hook
  const { register, handleSubmit } = useForm();

  // useNavigate hook
  const navigate = useNavigate();

  const [cookies, setCookie] = useCookies([""]);

  // useVerifyUserData Hook
  const { data, isError, isLoading, error, mutate } = useVerifyUserData();

  // useDispatch Hook
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  // Handle Submit
  const submit = (data) => {
    mutate(data);
  };

  useEffect(() => {
    if (error?.response?.data?.error === "INVALID_EMAIL_OR_PASSWORD") {
      dispatch(SIGNIN_ERROR("Invalid Email or Password!"));
    } else {
      if (data !== undefined && data !== null) {
        dispatch(DO_SIGNIN(data?.data?.data));

        dispatch(SIGNIN_ERROR(null));

        setCookie("avt_token", data?.data?.data?.jwtToken, {
          // expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        });
        navigate("/environment/home");
      }
    }
  }, [
    data,
    isError,
    isLoading,
    dispatch,
    error,
    navigate,
    auth,
    setCookie,
    cookies,
  ]);

  return (
    <>
      {isLoading && !isError && (
        <CircularProgress
          style={{
            alignItems: "center",
            justifyContent: "center",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          width: "100vw",
          height: "100vh",
        }}
      >
        <Card
          variant="outlined"
          style={{
            width: "50%",
            paddingTop: "180px",
            paddingBottom: "180px",
            paddingLeft: "80px",
            paddingRight: "80px",
          }}
        >
          <form onSubmit={handleSubmit(submit)}>
            {auth?.value?.signinError == null ? null : (
              <p style={{ color: "red", textAlign: "center" }}>
                {auth?.value?.signinError}
              </p>
            )}
            <AIInput
              inputName="userName"
              label="username"
              register={register}
              type="text"
              style={{
                width: "55%",
                margin: 20,
                marginLeft: "200px",
              }}
            />
            <AIInput
              inputName="password"
              label="password"
              register={register}
              type="password"
              style={{
                width: "55%",
                margin: 20,
                marginLeft: "200px",
              }}
            />
            <AIButton
              type="submit"
              content="signin"
              style={{
                width: "20%",
                margin: 20,
                marginLeft: "340px",
              }}
            />
          </form>
          <div
            style={{
              textAlign: "center",
              marginTop: 20,
            }}
          >
            don't have an account?
            <Link style={{ marginLeft: 10 }} to="/environment/signup">
              Signup
            </Link>
          </div>
          <div
            style={{
              textAlign: "center",
              marginTop: 20,
            }}
          >
            do you need help?
            <Link
              style={{ marginLeft: 10 }}
              to="/environment/reset/password/auth"
            >
              forgot password
            </Link>
          </div>
        </Card>
      </div>
    </>
  );
};
