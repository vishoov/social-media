import { useEffect } from "react";
import { useCookies } from "react-cookie";
import {
  useGetFollowers,
  useGetFollowings,
} from "../SocialMedia/APIs/SocialMediaProfileInterfaceAPI";

const useGetFollowersAndFollowingHook = (userId) => {
  const [cookies] = useCookies(["avt_token"]);

  const { refetch: refetchFollowers } = useGetFollowers({
    userId: userId,
    Authorization: cookies?.avt_token,
  });

  const { refetch: refetchFollowing } = useGetFollowings({
    userId: userId,
    Authorization: cookies?.avt_token,
  });

  useEffect(() => {
    refetchFollowers();
    refetchFollowing();
  }, [userId, refetchFollowers, refetchFollowing]);
};

export default useGetFollowersAndFollowingHook;
