import React, { useContext } from "react";
import { AIInput } from "../../../ReuseableComponents/AIInput";
import { useForm } from "react-hook-form";
import { Card } from "@mui/material";
import { AIButton } from "../../../ReuseableComponents/AIButton";
import { useVerifyUserData } from "../../APIs/userAPIs";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { Context as UserContext } from "../../../context/UserContext";

export const AISignin = () => {
  // useForm Hook
  const { register, handleSubmit } = useForm();

  const {
    state: { signinError },
  } = useContext(UserContext);

  // useVerifyUserData Hook
  const { isError, isLoading, mutate } = useVerifyUserData();

  // Handle Submit
  const submit = (data) => {
    mutate(data);
  };

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
            {signinError == null ? null : (
              <p style={{ color: "red", textAlign: "center" }}>{signinError}</p>
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
