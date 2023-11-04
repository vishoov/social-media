import { useCallback, useState } from "react";
import { useGetMemoriesWithinAWeek } from "../SocialMedia/APIs/SocialMediaHomeInterfaceAPI";
import { useCookies } from "react-cookie";

const useGetMemoriesWithinAWeekHook = () => {
  // useState variables
  const [requiredData, setRequiredData] = useState(null);

  // useCookies hook
  const [cookies] = useCookies(["avt_token"]);

  const { refetch, isLoading } = useGetMemoriesWithinAWeek(requiredData);

  const callBack = useCallback(() => {
    const jsonData = {
      Authorization: cookies?.avt_token,
    };

    if (requiredData === null) {
      setRequiredData(jsonData);
    } else {
      refetch();
    }
  }, [cookies?.avt_token, refetch, requiredData]);

  return [isLoading, callBack];
};

export default useGetMemoriesWithinAWeekHook;
