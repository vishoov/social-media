import { Avatar, Card, CircularProgress, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import salvare from "../../static/images/avatar/salvare.jpeg";
import { AIInput } from "../../ReuseableComponents/AIInput";
import { useForm } from "react-hook-form";
import { AIButton } from "../../ReuseableComponents/AIButton";
import { useAddSocialMediaUser } from "../APIs/SocialMediaUserInterfaceAPIs";
import { useCookies } from "react-cookie";
import { useGetActivationKey } from "../../Authentication/apis/IntermediateAPIs";
import { Context as UserContext } from "../../context/UserContext";
import useGetProfileDetailsHook from "../../hooks/useGetProfileDetailsHook";

export const SocialMediaActivationInterface = () => {
  // useForm hook
  const { register, handleSubmit } = useForm();

  // useCookies Hook

  const [cookies] = useCookies(["avt_token"]);

  const { mutate, isLoading } = useAddSocialMediaUser();

  useGetProfileDetailsHook();

  const {
    state: { socialMediaUserError },
  } = useContext(UserContext);

  const [userId, setUserId] = useState(null);

  const { refetch } = useGetActivationKey(userId);

  // submit handler function
  const submit = (userdata) => {
    const user = {
      Authorization: cookies.avt_token,
      data: userdata,
    };
    mutate(user);

    var user_id = localStorage.getItem("sm_user_id");

    const activationData = {
      user_id: user_id,
      Authorization: cookies?.avt_token,
    };

    if (user_id !== null && user_id !== undefined) {
      setUserId(activationData);
      refetch();
    }
  };

  return (
    <>
      <>
        {isLoading ? (
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
        ) : null}
        <table
          border={0}
          width="100%"
          cellSpacing={0}
          cellPadding={0}
          style={{
            borderCollapse: "collapse",
            textAlign: "center",
            width: "100%",
          }}
        >
          <tbody>
            <tr>
              <td width="15px" style={{ width: 15 }} />
              <td
                style={{ lineHeight: 0, maxWidth: 600, padding: "0 0 15px 0" }}
              >
                <table
                  border={0}
                  width="100%"
                  cellSpacing={0}
                  cellPadding={0}
                  style={{ borderCollapse: "collapse" }}
                >
                  <tbody>
                    <tr>
                      <td
                        style={{ width: "100%", textAlign: "left", height: 33 }}
                      >
                        <img
                          alt="nothing"
                          height={33}
                          src="https://ci4.googleusercontent.com/proxy/vHv3tRtE3I_2w6zR6JFt066OaSywcGpzkuO02W6QMIeOfCWNMc-TyEJKxu4mG2hoBsYBLNnCt6VSzhJNl2kOXcZTRdglv3R20xUvvc29ow=s0-d-e1-ft#https://static.xx.fbcdn.net/rsrc.php/v3/yO/r/Otjcwa2eCOF.png"
                          style={{ border: 0 }}
                          className="CToWUd"
                          data-bit="iit"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td width="15px" style={{ width: 15 }} />
            </tr>
          </tbody>
        </table>
        &nbsp;
      </>
      <Card
        style={{
          width: "100%",
          maxWidth: 600,
          margin: "0 auto",
          textAlign: "center",
          padding: "0 0 15px 0",
        }}
      >
        <div
          style={{
            height: "60vh",
          }}
        >
          <div
            style={{
              //   backgroundColor: "white",
              display: "flex",
              flexDirection: "column",
              marginTop: "150px",
              marginLeft: "140px",
              marginBottom: 40,
            }}
          >
            <Typography>
              {socialMediaUserError === null ? null : socialMediaUserError}
            </Typography>
            <Avatar
              alt="salvare"
              src={salvare}
              sx={{
                width: 300,
                height: 300,
              }}
            />
          </div>
          <form onSubmit={handleSubmit(submit)}>
            <div>
              <AIInput
                inputName="email"
                register={register}
                label="Enter your email"
                style={{
                  marginLeft: 10,
                  width: 400,
                  marginBottom: 20,
                }}
              />
              <AIButton
                content="INITIATE YOUR INTERFACE"
                style={{
                  marginTop: 30,
                }}
                type="submit"
              />
            </div>
          </form>
        </div>
      </Card>
    </>
  );
};
