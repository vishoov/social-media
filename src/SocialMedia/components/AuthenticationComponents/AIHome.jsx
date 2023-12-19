import React, { useContext } from "react";
import { AIButton } from "../../../ReuseableComponents/AIButton";
import { AIVoiceAssist } from "../../../ReuseableComponents/AIVoiceAssist";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Context as UserContext } from "../../../context/UserContext";

export const AIHome = () => {
  const {
    state: { shouldSpeak },
  } = useContext(UserContext);

  // use selector hook
  const auth = useSelector((state) => state.auth);

  // use navigate hook
  const navigate = useNavigate();

  return (
    <>
      <div>
        <h1 style={{ textAlign: "center" }}>Home</h1>
      </div>

      {auth?.value?.signupData !== null && shouldSpeak && (
        <AIVoiceAssist name={auth?.value?.signupData?.firstName} />
      )}
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
        onClick={() => {
          navigate("/environment/socialMedia/activate");
        }}
      />
    </>
  );
};
