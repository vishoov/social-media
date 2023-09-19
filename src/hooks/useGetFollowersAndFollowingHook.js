import { useCallback, useEffect } from "react";
import { useCookies } from "react-cookie";
import {
  useGetFollowers,
  useGetFollowings,
} from "../SocialMedia/APIs/SocialMediaProfileInterfaceAPI";

const useGetFollowersAndFollowingHook = (userId) => {
  const [cookies] = useCookies(["avt_token"]);

  console.log("userId :", userId);

  const { refetch: refetchFollowers } = useGetFollowers({
    userId: userId,
    Authorization: cookies?.avt_token,
  });

  const { refetch: refetchFollowing } = useGetFollowings({
    userId: userId,
    Authorization: cookies?.avt_token,
  });

  const callBack1 = useCallback(() => {
    refetchFollowers();
  }, [refetchFollowers]);

  const callBack2 = useCallback(() => {
    refetchFollowing();
  }, [refetchFollowing]);

  useEffect(() => {
    callBack1();
  }, [callBack1]);

  useEffect(() => {
    callBack2();
  }, [callBack2]);
};

export default useGetFollowersAndFollowingHook;
