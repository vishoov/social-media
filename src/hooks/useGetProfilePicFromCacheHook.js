import { useCallback, useRef } from "react";

const useGetProfilePicFromCacheHook = () => {
  const profile_pic = useRef(null);

  const callBack = useCallback(() => {
    if ("caches" in window) {
      caches.open("my-cache").then((cache) => {
        cache.match("/profilePics.json").then((response) => {
          if (response) {
            return response.json().then((data) => {
              const jsonData = {
                profilePicUrl: data?.profilePicUrl,
              };
              console.log("profile pic ---->", jsonData?.profilePicUrl?.[0]);
              profile_pic.current = jsonData?.profilePicUrl?.[0];
            });
          }
        });
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [callBack, profile_pic];
};

export default useGetProfilePicFromCacheHook;
