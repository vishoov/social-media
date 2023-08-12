import React from "react";
import { useEffect, useState } from "react";
import { AISignin } from "./AISignin";
import { useCookies } from "react-cookie";

// const useAuth = () => {
//   const [isAuthenticated, setisAuthenticated] = useState();

//   const [cookies] = useCookies(["avt_token"]);

//   useEffect(() => {
//     try {
//       if (cookies.avt_token !== null && cookies.avt_token !== undefined) {
//         setisAuthenticated(true);
//       } else {
//         setisAuthenticated(false);
//       }
//     } catch (err) {
//       setisAuthenticated(false);
//     }
//   }, [cookies]);

//   return isAuthenticated;
// };

export const AIAuthentication = ({ children }) => {
  const [cookies] = useCookies(["avt_token"]);
  const [authStatus, setAuthStatus] = useState(false);

  useEffect(() => {
    const isAuthenticated =
      cookies.avt_token !== null || cookies.avt_token !== undefined;
    setAuthStatus(isAuthenticated);
  }, [cookies, authStatus]);

  if (authStatus) {
    return <>{children}</>;
  } else {
    return <AISignin />;
  }
};
