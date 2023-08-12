import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const AICheckSession = () => {
  const [cookies] = useCookies(["avt_token"]);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies?.avt_token !== null || cookies?.avt_token !== undefined) {
      navigate("/environment/home");
    } else {
      navigate("/environment/signin");
    }
  }, [navigate, cookies]);

  return <></>;
};
