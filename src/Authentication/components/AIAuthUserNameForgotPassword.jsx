import React from "react";
import { AIInput } from "../../ReuseableComponents/AIInput";
import { AIButton } from "../../ReuseableComponents/AIButton";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useGenerateLink } from "../apis/userAPIs";

export const AIAuthUserNameForgotPassword = () => {
  // use Form hook
  const { register, handleSubmit } = useForm();

  const { mutate } = useGenerateLink();

  const auth = useSelector((state) => state.auth);

  const submit = (data) => {
    // setUser(data.searchField);
    mutate(data);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        {auth?.value?.otherError == null ? null : (
          <p style={{ color: "red", textAlign: "center", margin: 10 }}>
            {auth?.value?.otherError}
          </p>
        )}
        <p>
          Enter your email address or username below to reset your password.
        </p>
        <form onSubmit={handleSubmit(submit)}>
          <AIInput
            inputName="searchField"
            label="email or username"
            type="text"
            register={register}
            style={{
              width: "120%",
              height: "50px",
              marginBottom: "20px",
            }}
          />
          <AIButton
            content="send a link"
            type="submit"
            style={{
              width: "50%",
              height: "50px",
              marginLeft: 140,
            }}
          />
        </form>
      </div>
    </>
  );
};
