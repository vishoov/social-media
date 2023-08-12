import { Avatar, Card } from "@mui/material";
import React from "react";
import salvare from "../../static/images/avatar/salvare.jpeg";
import { AIInput } from "../../ReuseableComponents/AIInput";
import { useForm } from "react-hook-form";
import { AIButton } from "../../ReuseableComponents/AIButton";
import { useAddSocialMediaUser } from "../APIs/SocialMediaUserInterfaceAPIs";
import { useCookies } from "react-cookie";

export const SocialMediaActivationInterface = () => {
  // useForm hook
  const { register, handleSubmit } = useForm();

  // useCookies Hook

  const [cookies] = useCookies(["avt_token"]);

  const { mutate } = useAddSocialMediaUser();

  // submit handler function
  const submit = (data) => {
    const user = {
      Authorization: cookies.avt_token,
      data: data,
    };
    mutate(user);
  };

  return (
    <>
      <>
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
                inputName="userName"
                register={register}
                label="Enter your username"
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
