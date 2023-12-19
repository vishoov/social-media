import axios from "axios";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { setNotifications } from "../../reduxNonPersist/NonPersistNotificationSlice";

const url = () => {
  return axios.create({
    baseURL: `${process.env.REACT_APP_API_HOST_NAME}/ai/socialmedia/api/v1/private/central/notifications`,
  });
};

const get_all_notifications = (requiredData) => {
  console.log("requiredData", requiredData);

  if (requiredData?.Authorization && requiredData?.userId) {
    return url().get("/get/all/within/week", {
      headers: {
        Authorization: "Bearer " + requiredData?.Authorization,
      },
      params: {
        userId: requiredData?.userId,
      },
    });
  }
};

export const useGetAllNotifications = (requiredData) => {
  const dispatch = useDispatch();

  return useQuery(
    ["getAllNotifications", requiredData],
    () => get_all_notifications(requiredData),
    {
      onError: (error) => {
        console.log(error);
      },
      onSuccess: (data) => {
        dispatch(setNotifications([]));
        if (data?.status === 200) {
          data?.data?.data?.map((notification) =>
            dispatch(setNotifications(notification))
          );
        }
      },
      refetchOnMount: false,
      enabled: false,
      retry: 5,
      retryDelay: 1000,
    }
  );
};
