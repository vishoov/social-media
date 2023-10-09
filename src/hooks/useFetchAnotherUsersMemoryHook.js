<<<<<<< HEAD
import { useContext, useEffect } from "react";
import { useGetAllMemoriesForOtherUser } from "../SocialMedia/APIs/SocialMediaMemoryInterfaceAPI";
import { useCookies } from "react-cookie";
import { Context as MemoryContext } from "../context/MemoryContext";
=======
import { useEffect } from "react";
import { useGetAllMemoriesForOtherUser } from "../SocialMedia/APIs/SocialMediaMemoryInterfaceAPI";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setSocialMediaMemoriesOfAnotherUserFirstTime } from "../reduxNonPersist/NonPersistMemoriesSlice";
>>>>>>> defdabe (NEW)

const useFetchAnotherUsersMemoryHook = (userId) => {
  const [cookies] = useCookies(["avt_token"]);

<<<<<<< HEAD
  const {
    // setSocialMediaMemoriesOfAnotherUser,
    state: { socialMediaMemoriesOfAnotherUser },
    setSocialMediaMemoriesOfAnotherUserFirstTime,
  } = useContext(MemoryContext);
=======
  const dispatch = useDispatch();

  const NonPersistMemories = useSelector((state) => state.NonPersistMemories);
>>>>>>> defdabe (NEW)

  const { refetch } = useGetAllMemoriesForOtherUser({
    Authorization: cookies?.avt_token,
    userId: userId,
    pageNumber: 1,
  });

  useEffect(() => {
<<<<<<< HEAD
    if (socialMediaMemoriesOfAnotherUser?.length > 0) {
      setSocialMediaMemoriesOfAnotherUserFirstTime([]);
=======
    if (NonPersistMemories?.socialMediaMemoriesOfAnotherUser?.length > 0) {
      dispatch(setSocialMediaMemoriesOfAnotherUserFirstTime([]));
>>>>>>> defdabe (NEW)
    }
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch, userId]);
};

export default useFetchAnotherUsersMemoryHook;
