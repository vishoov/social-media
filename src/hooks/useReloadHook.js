import { USER_DETAILS, USER_NOT_FOUND } from "../redux/AuthSlice";
import { useUserVerificationForgotPassword } from "../Authentication/apis/userAPIs";
import { useDispatch } from "react-redux";

// const dispatch = useDispatch();

const reducer = (action) => {
  switch (action.type) {
    case "AUTH_USER_DETAILS":
      {
        try {
          var { data, error } = useUserVerificationForgotPassword(
            action.payload
          );
          if (data?.data?.data !== null || data?.data?.data !== undefined) {
            // dispatch(USER_DETAILS(data?.data?.data));
          }
        } catch (err) {
          //   dispatch(USER_NOT_FOUND(error));
        }
      }
      return;
    default:
      return;
  }
};

const useReloadHook = (moduleInfo) => {
  reducer(moduleInfo);
};

export default useReloadHook;
