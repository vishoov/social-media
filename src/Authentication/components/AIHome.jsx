import React, { useEffect, useState } from "react";
import { AIButton } from "../../ReuseableComponents/AIButton";
import { AIVoiceAssist } from "../../ReuseableComponents/AIVoiceAssist";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const AIHome = () => {
  // state variable
  const [firstName, setFirstName] = useState(null);

  // use selector hook
  const auth = useSelector((state) => state.auth);

  // use navigate hook
  const navigate = useNavigate();

  // useEffect hook
  useEffect(() => {
    console.log(auth?.value?.signupData);
    if (auth?.value?.signupData?.firstName !== null) {
      setFirstName(auth?.value?.signupData?.firstName);
    }
  }, [auth]);

  return (
    <>
      <div>
        <h1 style={{ textAlign: "center" }}>Home</h1>
      </div>

      {auth?.value?.signupData !== null && auth?.value?.signinData === null && (
        <AIVoiceAssist name={firstName} />
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
