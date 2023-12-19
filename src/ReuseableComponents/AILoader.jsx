import React, { useEffect } from "react";
import space from "../static/images/utils/spacex.svg";
import { Avatar, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useGet_all_conversations_of_specific_user } from "../SocialMedia/APIs/SocialMediaMessageInterfaceAPI";
import { useCookies } from "react-cookie";

export const AILoader = () => {
  const select = useSelector((state) => state.utilities);

  const [cookies] = useCookies(["avt_token"]);

  const { refetch: refetchForMessagingInterface } =
    useGet_all_conversations_of_specific_user({
      Authorization: cookies?.avt_token,
      userId: localStorage.getItem("sm_user_id"),
    });

  useEffect(() => {
    switch (select?.currentInterface) {
      case "MESSAGING_INTERFACE":
        refetchForMessagingInterface();
        break;
      default:
        break;
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Stack
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        spacing={60}
      >
        <Avatar
          variant="square"
          src={space}
          srcSet={space}
          alt="not found!"
          sx={{
            width: 250,
            height: 250,
          }}
        />
        <Typography
          variant="subtitle1"
          color="lightgray"
          justifyContent="center"
        >
          from
        </Typography>
      </Stack>
    </>
  );
};
