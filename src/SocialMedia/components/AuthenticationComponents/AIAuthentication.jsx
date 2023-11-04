import React from "react";
import { useEffect, useState } from "react";
import { AISignin } from "./AISignin";
import { useCookies } from "react-cookie";
import { Outlet } from "react-router-dom";

export const AIAuthentication = ({ children }) => {
  const [cookies] = useCookies(["avt_token"]);
  const [authStatus, setAuthStatus] = useState(false);

  useEffect(() => {
    const isAuthenticated =
      cookies.avt_token !== null && cookies.avt_token !== undefined;
    setAuthStatus(isAuthenticated);
  }, [cookies, authStatus]);

  if (authStatus) {
    return (
      <>
        <Outlet />
        {children}
      </>
    );
  } else {
    return <AISignin />;
  }
};
