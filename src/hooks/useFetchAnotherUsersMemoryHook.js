import { useContext, useEffect } from "react";
import { useGetAllMemoriesForOtherUser } from "../SocialMedia/APIs/SocialMediaMemoryInterfaceAPI";
import { useCookies } from "react-cookie";
import { Context as MemoryContext } from "../context/MemoryContext";

const useFetchAnotherUsersMemoryHook = (userId) => {
  const [cookies] = useCookies(["avt_token"]);

  const {
    // setSocialMediaMemoriesOfAnotherUser,
    state: { socialMediaMemoriesOfAnotherUser },
    setSocialMediaMemoriesOfAnotherUserFirstTime,
  } = useContext(MemoryContext);

  const { refetch } = useGetAllMemoriesForOtherUser({
    Authorization: cookies?.avt_token,
    userId: userId,
    pageNumber: 1,
  });

  useEffect(() => {
    if (socialMediaMemoriesOfAnotherUser?.length > 0) {
      setSocialMediaMemoriesOfAnotherUserFirstTime([]);
    }
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch, userId]);
};

export default useFetchAnotherUsersMemoryHook;
