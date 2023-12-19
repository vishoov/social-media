import { useEffect } from "react";
import { useGetAllMemoriesForOtherUser } from "../SocialMedia/APIs/SocialMediaMemoryInterfaceAPI";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setSocialMediaMemoriesOfAnotherUserFirstTime } from "../reduxNonPersist/NonPersistMemoriesSlice";

const useFetchAnotherUsersMemoryHook = (userId) => {
  const [cookies] = useCookies(["avt_token"]);

  const dispatch = useDispatch();

  const NonPersistMemories = useSelector((state) => state.NonPersistMemories);

  const { refetch } = useGetAllMemoriesForOtherUser({
    Authorization: cookies?.avt_token,
    userId: userId,
    pageNumber: 1,
  });

  useEffect(() => {
    if (NonPersistMemories?.socialMediaMemoriesOfAnotherUser?.length > 0) {
      dispatch(setSocialMediaMemoriesOfAnotherUserFirstTime([]));
    }
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch, userId]);
};

export default useFetchAnotherUsersMemoryHook;
