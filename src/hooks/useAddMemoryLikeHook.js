import { useState } from "react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { useAddMemoryLike } from "../SocialMedia/APIs/SocialMediaHomeInterfaceAPI";

const useAddMemoryLikeHook = () => {
  const NonPersistForHome = useSelector((state) => state.NonPersistForHome);

  const [cookies] = useCookies(["avt_token"]);

  const { mutate } = useAddMemoryLike();

  const [likedStates, setLikedStates] = useState([]);

  const handleLikeClick = (likeData, index) => {
    const newLikedStates = Array(
      NonPersistForHome?.HomeMemoriesContent?.length
    ).fill(false);

    // Toggle the liked state for the clicked picture
    newLikedStates[index] = !likedStates[index];

    // Update the liked states
    setLikedStates(newLikedStates);

    var likes = {
      likedata: {
        creatorUserId: likeData?.userId,
        memoryDetailsId: likeData?.memoryDetailsId,
        likesInfo: {
          likerUserId: parseInt(localStorage.getItem("sm_user_id")),
        },
      },
      Authorization: cookies?.avt_token,
    };
    mutate(likes);
  };

  return {
    handleLikeClick,
    likedStates,
  };
};
export default useAddMemoryLikeHook;
