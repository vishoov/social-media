import { useCallback, useEffect, useState } from "react";
import { useGetMemoriesWithinAWeek } from "../SocialMedia/APIs/SocialMediaHomeInterfaceAPI";
import { useCookies } from "react-cookie";

const useGetMemoriesWithinAWeekHook = () => {
  // useState variables
  const [requiredData, setRequiredData] = useState(null);

  // useCookies hook
  const [cookies] = useCookies(["avt_token"]);

  const { refetch } = useGetMemoriesWithinAWeek(requiredData);

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

  useEffect(() => {
    callBack();
  }, [callBack]);
};

export default useGetMemoriesWithinAWeekHook;
