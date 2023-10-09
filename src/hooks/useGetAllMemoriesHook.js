import { useCookies } from "react-cookie";
import { useGetAllMemories } from "../SocialMedia/APIs/SocialMediaMemoryInterfaceAPI";
<<<<<<< HEAD
import { Context as MemoryContext } from "../context/MemoryContext";
import { useCallback, useContext, useEffect } from "react";
=======
import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
>>>>>>> defdabe (NEW)

const useGetAllMemoriesHook = (pageNumber) => {
  const [cookies] = useCookies(["avt_token"]);

  const { refetch } = useGetAllMemories({
    Authorization: cookies?.avt_token,
    userId: localStorage.getItem("sm_user_id"),
    pageNumber: pageNumber,
  });

<<<<<<< HEAD
  const {
    state: { socialMediaMemories },
  } = useContext(MemoryContext);

  const callBack = useCallback(() => {
    if (socialMediaMemories?.length <= 0) {
=======
  const NonPersistMemories = useSelector((state) => state.NonPersistMemories);

  const callBack = useCallback(() => {
    if (NonPersistMemories?.socialMediaMemories?.length <= 0) {
>>>>>>> defdabe (NEW)
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
