import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const AICheckSession = () => {
  const [cookies] = useCookies(["avt_token"]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("AICheckSession");
    if (cookies?.avt_token !== null && cookies?.avt_token !== undefined) {
      if (
        localStorage.getItem("soc_ak_code") !== null &&
        localStorage.getItem("soc_ak_code") !== undefined
      ) {
        navigate("/environment/socialMedia/home");
      } else {
        navigate("/environment/home");
      }
    } else {
      navigate("/environment/signin");
    }
  }, [navigate, cookies]);

  return <></>;
};
