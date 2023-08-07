import React from "react";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { AISignin } from "./AISignin";
import { useCookies } from "react-cookie";

const useAuth = () => {
  const [isAuthenticated, setisAuthenticated] = useState();

  const [cookies] = useCookies(["avt_token"]);

  useEffect(() => {
    try {
      if (cookies.avt_token !== null && cookies.avt_token !== undefined) {
        setisAuthenticated(true);
      } else {
        setisAuthenticated(false);
      }
    } catch (err) {
      setisAuthenticated(false);
    }
  }, [cookies]);

  return isAuthenticated;
};

export const AIAuthentication = () => {
  const isAuthenticated = useAuth();

  if (isAuthenticated) {
    return <Outlet />;
  } else {
    return <AISignin />;
  }
};
