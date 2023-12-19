import { useCallback } from "react";
import { useGetMemoriesWithinAWeek } from "../SocialMedia/APIs/SocialMediaHomeInterfaceAPI";
import { useCookies } from "react-cookie";

const useGetMemoriesWithinAWeekHook = () => {
  // useCookies hook
  const [cookies] = useCookies(["avt_token"]);

  const { refetch, isLoading } = useGetMemoriesWithinAWeek({
    Authorization: cookies?.avt_token,
  });

  const callBack = useCallback(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [isLoading, callBack];
};

export default useGetMemoriesWithinAWeekHook;
