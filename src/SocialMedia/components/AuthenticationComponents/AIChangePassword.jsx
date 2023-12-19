import React from "react";
import { AIInput } from "../../../ReuseableComponents/AIInput";
import { useForm } from "react-hook-form";
import { Card } from "@mui/material";
import { AIButton } from "../../../ReuseableComponents/AIButton";
import { getAuthDataById } from "../../../IndexDB";
import { useCookies } from "react-cookie";
import { useChangePassword } from "../../APIs/userAPIs";

export const AIChangePassword = () => {
  // react hook form component
  const { register, handleSubmit } = useForm();

  const [cookies] = useCookies(["sf_f_c_p_code"]);

  const { mutate } = useChangePassword();

  // submit handler for password change
  const submit = async (data) => {
    var emailFromIndexdb;

    if (cookies.sf_f_c_p_code !== null && cookies.sf_f_c_p_code !== undefined) {
      emailFromIndexdb = await getAuthDataById(cookies.sf_f_c_p_code.value);
    }

    console.log(emailFromIndexdb);

    var jsonData = {
      searchField: emailFromIndexdb.value,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };
    mutate(jsonData);
  };

  return (
    <>
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
            <AIInput
              inputName="password"
              label="Enter New Password"
              type="password"
              register={register}
              style={{
                width: "50%",
                marginBottom: "30px",
                marginLeft: "220px",
              }}
            />
            <AIInput
              inputName="confirmPassword"
              label="Enter Confirm New Password"
              type="password"
              register={register}
              style={{
                width: "50%",
                marginBottom: "30px",
                marginLeft: "220px",
              }}
            />
            <AIButton
              content="Reset Password"
              type="submit"
              style={{
                width: "30%",
                margin: 20,
                marginLeft: "310px",
              }}
            />
          </form>
        </Card>
      </div>
    </>
  );
};
