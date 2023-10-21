import { useCallback } from "react";
import { useCookies } from "react-cookie";
import { useGetAllGroupMessages } from "../SocialMedia/APIs/SocialMediaMessageInterfaceAPI";

const useGetGroupMessageHook = (conversationId, message) => {
  const [cookies] = useCookies(["avt_token"]);

  const { refetch } = useGetAllGroupMessages({
    Authorization: cookies?.avt_token,
    visibleGroupConversationId:
      message?.selectedGroup?.visibleGroupConversationId || conversationId,
  });

  const callBack = useCallback(() => {
    refetch();
    // eslint-disable-next-line
  }, []);

  return {
    callBack,
  };
};

export default useGetGroupMessageHook;
