<<<<<<< HEAD
import React, { useContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useGet_all_conversations_of_specific_user } from "../../SocialMedia/APIs/SocialMediaMessageInterfaceAPI";
import { Context as MessageContext } from "../../context/MessageContext";
import { RegularMessageChatComponent } from "./RegularMessageChatComponent";
import { FirstTimeChatComponent } from "./FirstTimeChatComponent";
import { AISideBar } from "../AISideBar";

export const WelcomeMessaging = () => {
  const [cookies] = useCookies(["avt_token"]);
  const {
    state: { all_conversations },
  } = useContext(MessageContext);
=======
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useGet_all_conversations_of_specific_user } from "../../SocialMedia/APIs/SocialMediaMessageInterfaceAPI";
import { RegularMessageChatComponent } from "./RegularMessageChatComponent";
import { FirstTimeChatComponent } from "./FirstTimeChatComponent";
import { AISideBar } from "../AISideBar";
import { useSelector } from "react-redux";

export const WelcomeMessaging = () => {
  const [cookies] = useCookies(["avt_token"]);
>>>>>>> defdabe (NEW)

  const { refetch } = useGet_all_conversations_of_specific_user({
    Authorization: cookies?.avt_token,
    userId: localStorage.getItem("sm_user_id"),
  });

<<<<<<< HEAD
  useEffect(() => {
    if (all_conversations?.length === 0) {
      console.log("all_conversations.length === 0");
=======
  const NonPersistConversations = useSelector(
    (state) => state.NonPersistConversations
  );

  useEffect(() => {
    if (NonPersistConversations?.all_conversations?.length === 0) {
>>>>>>> defdabe (NEW)
      refetch();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <>
        <AISideBar />
<<<<<<< HEAD
        {all_conversations?.length > 0 ? (
          <RegularMessageChatComponent all_conversations={all_conversations} />
=======
        {NonPersistConversations?.all_conversations?.at(0) !== null &&
        NonPersistConversations?.all_conversations?.length > 0 ? (
          <RegularMessageChatComponent
            all_conversations={NonPersistConversations?.all_conversations}
          />
>>>>>>> defdabe (NEW)
        ) : (
          <FirstTimeChatComponent />
        )}
      </>
    </>
  );
};
