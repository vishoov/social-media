import React from "react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Index } from "./Authentication/components/Index";
import { AISignup } from "./Authentication/components/AISignup";
import { AISignin } from "./Authentication/components/AISignin";
import { AIHome } from "./Authentication/components/AIHome";
import { AIAuthUserNameForgotPassword } from "./Authentication/components/AIAuthUserNameForgotPassword";
import { WaitAuthentication } from "./Authentication/components/WaitAuthentication";
import { AIChangePassword } from "./Authentication/components/AIChangePassword";
import { AIAuthentication } from "./Authentication/components/AIAuthentication";
import { SocialMediaHome } from "./SocialMedia/components/SocialMediaHome";
import { SocialMediaActivationInterface } from "./SocialMedia/components/SocialMediaActivationInterface";
import { AICheckSession } from "./Authentication/components/AICheckSession";

export const Routes = ({ children }) => {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <AICheckSession />,
    },
    {
      path: "environment",
      children: [
        {
          path: "",
          element: <Index />,
        },
        {
          path: "signup",
          element: <AISignup />,
        },
        {
          path: "signin",
          element: <AISignin />,
        },
        {
          path: "home",
          element: (
            <AIAuthentication>
              <AIHome />
            </AIAuthentication>
          ),
        },
        {
          path: "reset/password/auth",
          element: <AIAuthUserNameForgotPassword />,
        },
        {
          path: "reset/password",
          element: <AIChangePassword />,
        },
        {
          path: "wait/reset",
          element: <WaitAuthentication />,
        },
        {
          path: "socialMedia",
          children: [
            {
              path: "home",
              element: (
                <AIAuthentication>
                  <SocialMediaHome />
                </AIAuthentication>
              ),
            },
            {
              path: "activate",
              element: (
                <AIAuthentication>
                  <SocialMediaActivationInterface />
                </AIAuthentication>
              ),
            },
          ],
        },
      ],
    },
  ]);

  return (
    <>
      <React.Fragment>
        <RouterProvider router={routes}>
          <Outlet /> {children}
        </RouterProvider>
      </React.Fragment>
    </>
  );
};
