import { useCookies } from "react-cookie";
import { useGetAllMemories } from "../SocialMedia/APIs/SocialMediaMemoryInterfaceAPI";
import { Context as MemoryContext } from "../context/MemoryContext";
import { useCallback, useContext, useEffect } from "react";

const useGetAllMemoriesHook = (pageNumber) => {
  const [cookies] = useCookies(["avt_token"]);

  const { refetch } = useGetAllMemories({
    Authorization: cookies?.avt_token,
    userId: localStorage.getItem("sm_user_id"),
    pageNumber: pageNumber,
  });

  const {
    state: { socialMediaMemories },
  } = useContext(MemoryContext);

  const callBack = useCallback(() => {
    if (socialMediaMemories?.length <= 0) {
      refetch();
    }
    // eslint-disable-next-line
  }, []);

  // const random = localStorage.getItem("random");

  useEffect(() => {
    callBack();
  }, [callBack]);
};

export default useGetAllMemoriesHook;
