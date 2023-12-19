import { useCallback, useEffect } from "react";
import { useGetMemoriesCount } from "../SocialMedia/APIs/SocialMediaMemoryInterfaceAPI";
import { useCookies } from "react-cookie";

const useGetMemoriesCountHook = (userId) => {
  const [cookies] = useCookies(["avt_token"]);

  const { refetch } = useGetMemoriesCount({
    userId: userId,
    Authorization: cookies.avt_token,
  });

  const callBack = useCallback(() => {
    refetch();
  }, [refetch]);

  // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(() => {
    callBack();
  }, [callBack]);
};

export default useGetMemoriesCountHook;
