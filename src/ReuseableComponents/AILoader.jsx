import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useGetProfileDetails } from "../SocialMedia/APIs/SocialMediaProfileInterfaceAPI";
import jen1 from "../static/images/avatar/Jen20.jpeg";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";

export const AILoader = ({ children }) => {
  const [cookies] = useCookies(["avt_token"]);

  const [requiredData, setRequiredData] = useState({});

  const { isLoading, refetch } = useGetProfileDetails(requiredData);

  const socialMediaUser = useSelector((state) => state.socialMediaUser);

  useEffect(() => {
    if (
      Object.keys(requiredData).length > 0 &&
      socialMediaUser?.value?.SocialMediaUserData !== null
    ) {
      if (cookies.avt_token !== null) {
        refetch();
      }
    } else {
      setRequiredData({
        Authorization: cookies?.avt_token,
      });
    }
  }, [
    cookies.avt_token,
    refetch,
    requiredData,
    socialMediaUser?.value?.SocialMediaUserData,
  ]);

  return (
    <>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar
            variant="square"
            src={jen1}
            srcSet={jen1}
            alt="not found!!!"
            style={{
              width: 400,
              height: 400,
            }}
          />
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
};
