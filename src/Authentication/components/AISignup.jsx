import React, { useContext } from "react";
import { AIInput } from "../../ReuseableComponents/AIInput";
import { Card } from "@mui/material";
import { AIButton } from "../../ReuseableComponents/AIButton";
import { useForm } from "react-hook-form";
import { useAddUserData } from "../apis/userAPIs";
import { Link } from "react-router-dom";
import { Context as UserContext } from "../../context/UserContext";
import { CircularProgress } from "@mui/material";

export const AISignup = () => {
  // use form hook
  const { register, handleSubmit } = useForm();

  const {
    state: { signupError },
  } = useContext(UserContext);

  // useAddUserData hook
  const { mutate, isLoading, isError } = useAddUserData();

  // submit handler function
  const submit = async (user) => {
    mutate(user);
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
            {signupError == null ? null : (
              <p style={{ color: "red", textAlign: "center" }}>{signupError}</p>
            )}

            <AIInput
              type="text"
              label="firstName"
              register={register}
              inputName="firstName"
              style={{
                width: "45%",
                margin: 20,
              }}
            />
            <AIInput
              type="text"
              label="lastName"
              register={register}
              inputName="lastName"
              style={{
                width: "45%",
                margin: 20,
              }}
            />
            <AIInput
              type="email"
              label="email"
              register={register}
              inputName="email"
              style={{
                width: "45%",
                marginLeft: 180,
              }}
            />
            <AIInput
              type="text"
              label="userName"
              register={register}
              inputName="userName"
              style={{
                width: "45%",
                margin: 20,
              }}
            />
            <AIInput
              type="password"
              label="password"
              register={register}
              inputName="password"
              style={{
                width: "45%",
                margin: 20,
              }}
            />
            <AIButton
              content="signup"
              type="submit"
              style={{ width: "20%", marginTop: 10, marginLeft: 340 }}
            />
          </form>
          <div
            style={{
              textAlign: "center",
              marginTop: 20,
            }}
          >
            Already have an account?
            <Link style={{ marginLeft: 10 }} to="/environment/signin">
              Signin
            </Link>
          </div>
        </Card>
      </div>
    </>
  );
};
