import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Index } from "./Authentication/components/Index";
import { AISignup } from "./Authentication/components/AISignup";
import { AISignin } from "./Authentication/components/AISignin";
import { AIHome } from "./Authentication/components/AIHome";
import { AIAuthUserNameForgotPassword } from "./Authentication/components/AIAuthUserNameForgotPassword";
import { WaitAuthentication } from "./Authentication/components/WaitAuthentication";
import { AIChangePassword } from "./Authentication/components/AIChangePassword";
import { AIAuthentication } from "./Authentication/components/AIAuthentication";
import { SocialMediaHome } from "./SocialMedia/components/HomeComponent/SocialMediaHome";
import { SocialMediaActivationInterface } from "./SocialMedia/components/SocialMediaActivationInterface";
import { AICheckSession } from "./Authentication/components/AICheckSession";
import { AISocialMediaProfileInterface } from "./SocialMedia/components/profileComponent/AISocialMediaProfileInterface";
import { AISocialMediaEditProfile } from "./SocialMedia/components/profileComponent/AISocialMediaEditProfile";
import { AnotherUsersProfile } from "./SocialMedia/components/profileComponent/AnotherUsersProfile";
import { SocialMediaNotificationInterface } from "./SocialMedia/components/NotificationComponent/SocialMediaNotificationInterface";
import { MessagingComponent } from "./SocialMedia/components/MessagingComponents/MessagingComponent";
import { WelcomeMessaging } from "./ReuseableComponents/Messaging/WelcomeMessaging";

import { PendingMessages } from "./SocialMedia/components/MessagingComponents/PendingMessages";
import { GroupMessagingComponent } from "./SocialMedia/components/MessagingComponents/GroupMessagingComponent";

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
              path: "activate",
              element: (
                <AIAuthentication>
                  <SocialMediaActivationInterface />
                </AIAuthentication>
              ),
            },
            {
              path: "home",
              element: (
                <AIAuthentication>
                  <SocialMediaHome />
                </AIAuthentication>
              ),
            },
            {
              path: "profile",
              element: (
                <AIAuthentication>
                  <AISocialMediaProfileInterface />
                </AIAuthentication>
              ),
            },
            {
              path: "profile/edit/",
              element: (
                <AIAuthentication>
                  <AISocialMediaEditProfile />
                </AIAuthentication>
              ),
            },
            {
              path: "profile/:username",
              element: (
                <AIAuthentication>
                  <AnotherUsersProfile />
                </AIAuthentication>
              ),
            },
            {
              path: "Notifications",
              element: (
                <AIAuthentication>
                  <SocialMediaNotificationInterface />
                </AIAuthentication>
              ),
            },
            {
              path: "message",
              element: (
                <AIAuthentication>
                  <WelcomeMessaging />
                </AIAuthentication>
              ),
            },
            {
              path: "message/:conversationId",
              element: (
                <AIAuthentication>
                  <MessagingComponent />
                </AIAuthentication>
              ),
            },
            {
              path: "message/group/:groupConversationId",
              element: (
                <AIAuthentication>
                  <GroupMessagingComponent />
                </AIAuthentication>
              ),
            },
            {
              path: "message/pending",
              element: (
                <AIAuthentication>
                  <PendingMessages />
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
        <RouterProvider router={routes}>{children}</RouterProvider>
      </React.Fragment>
    </>
  );
};
