import { useCallback, useEffect } from "react";
import { useGetProfileDetails } from "../SocialMedia/APIs/SocialMediaProfileInterfaceAPI";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";

const useGetProfileDetailsHook = () => {
  const [cookies] = useCookies(["avt_token"]);

  const { refetch } = useGetProfileDetails({
    Authorization: cookies?.avt_token,
  });

  const userData = useSelector((state) => state.socialMediaUser);

  const callBack1 = useCallback(() => {
    if (userData?.value?.SocialMediaUserData === null) {
      refetch();
    }
  }, [userData?.value?.SocialMediaUserData, refetch]);

  useEffect(() => {
    callBack1();
  }, [callBack1]);
};

export default useGetProfileDetailsHook;
