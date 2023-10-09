import { useCookies } from "react-cookie";
import { useGetAllMemories } from "../SocialMedia/APIs/SocialMediaMemoryInterfaceAPI";

import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";

const useGetAllMemoriesHook = (pageNumber) => {
  const [cookies] = useCookies(["avt_token"]);

  const { refetch } = useGetAllMemories({
    Authorization: cookies?.avt_token,
    userId: localStorage.getItem("sm_user_id"),
    pageNumber: pageNumber,
  });

  const NonPersistMemories = useSelector((state) => state.NonPersistMemories);

  const callBack = useCallback(() => {
    if (NonPersistMemories?.socialMediaMemories?.length <= 0) {
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
