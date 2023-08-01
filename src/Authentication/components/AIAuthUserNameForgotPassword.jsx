import React, { useEffect, useState } from "react";
import { AIInput } from "../../ReuseableComponents/AIInput";
import { AIButton } from "../../ReuseableComponents/AIButton";
import { useForm } from "react-hook-form";
import { useUserVerificationForgotPassword } from "../apis/userAPIs";
import { useDispatch, useSelector } from "react-redux";
import { USER_DETAILS, USER_NOT_FOUND } from "../../redux/AuthSlice";

export const AIAuthUserNameForgotPassword = () => {
  // use Form hook
  const { register, handleSubmit } = useForm();

  const [user, setUser] = useState(null);

  const { data, isLoading, error, refetch } =
    useUserVerificationForgotPassword(user);

  const dispatch = useDispatch();

  const submit = (data) => {
    setUser(data.searchField);
    refetch();
  };

  useEffect(() => {
    try {
      if (data?.data?.data !== null || data?.data?.data !== undefined) {
        dispatch(USER_DETAILS(data));
      }
    } catch (err) {
      dispatch(USER_NOT_FOUND(err));
    }
  }, [data, isLoading, error, dispatch]);

  const auth = useSelector((state) => state.auth);

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
            content="submit"
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
