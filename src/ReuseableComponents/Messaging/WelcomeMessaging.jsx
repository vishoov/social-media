import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useGet_all_conversations_of_specific_user } from "../../SocialMedia/APIs/SocialMediaMessageInterfaceAPI";
import { RegularMessageChatComponent } from "./RegularMessageChatComponent";
import { FirstTimeChatComponent } from "./FirstTimeChatComponent";
import { AISideBar } from "../AISideBar";
import { useSelector } from "react-redux";

export const WelcomeMessaging = () => {
  const [cookies] = useCookies(["avt_token"]);

  const { refetch } = useGet_all_conversations_of_specific_user({
    Authorization: cookies?.avt_token,
    userId: localStorage.getItem("sm_user_id"),
  });

  const NonPersistConversations = useSelector(
    (state) => state.NonPersistConversations
  );

  useEffect(() => {
    if (NonPersistConversations?.all_conversations?.length === 0) {
      refetch();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <>
        <AISideBar />

        {NonPersistConversations?.all_conversations?.at(0) !== null &&
        NonPersistConversations?.all_conversations?.length > 0 ? (
          <RegularMessageChatComponent
            all_conversations={NonPersistConversations?.all_conversations}
          />
        ) : (
          <FirstTimeChatComponent />
        )}
      </>
    </>
  );
};
