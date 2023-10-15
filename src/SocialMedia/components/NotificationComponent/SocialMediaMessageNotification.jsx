import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
// import jen21 from "../../../static/images/avatar/Jen21.jpeg";

const SocialMediaMessageNotification = () => {
  const NonPersistNotification = useSelector(
    (state) => state.NonPersistNotification
  );

  const showNotification = () => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          const username =
            NonPersistNotification?.messageNotification?.username;
          const message = NonPersistNotification?.messageNotification?.message;
          const type =
            NonPersistNotification?.messageNotification?.primaryKeys?.type;
          const profilePic =
            NonPersistNotification?.messageNotification?.profilePic;

          let options = {
            body: type === "TEXT" ? message : "sent you a pic",
            icon: profilePic, // Image URL
          };

          new Notification(username, options);
        }
      });
    } else {
      alert("browser does not support desktop notification");
    }
  };

  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  }, []);

  const callBack = useCallback(() => {
    if (
      NonPersistNotification?.messageNotification?.message !== undefined &&
      NonPersistNotification?.messageNotification?.message !== null
    ) {
      showNotification();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [NonPersistNotification?.messageNotification?.message]);

  useEffect(() => {
    callBack();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callBack]);

  return <div></div>;
};

export default SocialMediaMessageNotification;
