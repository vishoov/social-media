import { useCallback } from "react";
import { useGetMessageOfParticularConversation } from "../SocialMedia/APIs/SocialMediaMessageInterfaceAPI";
import { useCookies } from "react-cookie";

const useGetMessagesOfParticularConversationHook = (
  conversationId,
  message
) => {
  const [cookies] = useCookies(["avt_token"]);

  const { refetch } = useGetMessageOfParticularConversation({
    Authorization: cookies?.avt_token,
    conversation_id:
      message?.selectedConversation?.conversationId || conversationId,
  });

  const callBack = useCallback(() => {
    refetch();
    // eslint-disable-next-line
  }, []);

  return {
    callBack,
  };
};

export default useGetMessagesOfParticularConversationHook;
