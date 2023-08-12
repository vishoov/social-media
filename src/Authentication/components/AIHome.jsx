import React, { useEffect, useState } from "react";
import { AIButton } from "../../ReuseableComponents/AIButton";
import { AIVoiceAssist } from "../../ReuseableComponents/AIVoiceAssist";
import { useSelector } from "react-redux";
import { useAddActivationKey } from "../apis/IntermediateAPIs";
import { useCookies } from "react-cookie";
import { CircularProgress } from "@mui/material";

export const AIHome = () => {
  // state variable
  const [firstName, setFirstName] = useState(null);

  // use selector hook
  const auth = useSelector((state) => state.auth);

  const { mutate, isLoading, isError } = useAddActivationKey();

  const [cookies] = useCookies(["avt_token"]);

  // useEffect hook
  useEffect(() => {
    setFirstName(auth?.value?.signupData?.firstName);
  }, [auth]);

  // route handler
  const routeHandler = () => {
    const data = {
      Authorization: cookies?.avt_token,
      data: {
        activatedInterface: "SOCIAL_MEDIA_INTERFACE",
      },
    };

    mutate(data);
  };

  return (
    <>
      <div>
        <h1 style={{ textAlign: "center" }}>Home</h1>
      </div>
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

      {firstName && <AIVoiceAssist name={firstName} />}
      <AIButton
        content="Initiate Social Media user interface"
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          width: "400px",
          margin: "auto",
          marginTop: "20px",
          marginBottom: "20px",
          textAlign: "center",
          fontSize: "15px",
          fontWeight: "bold",
        }}
        onClick={routeHandler}
      />
    </>
  );
};
