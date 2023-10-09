<<<<<<< HEAD
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../src/redux/AuthSlice";
import SocialMediaMemoriesReducer from "./redux/SocialMediaMemoriesSlice";
import socialMediaUserDataReducer from "./redux/SocialMediaUserSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import SearchReducer from "./redux/SearchSlice";
import HomeReducer from "./redux/SocialMediaHomeSlice";
import UtilitiesSlice from "./redux/UtilitiesSlice";
import NotificationSlice from "./redux/Notifications";
import profileReducer from "./redux/ProfileSlice";
import messageReducer from "./redux/MessageSlice";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["searchError", "searchData"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  memories: SocialMediaMemoriesReducer,
  socialMediaUser: socialMediaUserDataReducer,
  search: SearchReducer,
  home: HomeReducer,
  utilities: UtilitiesSlice,
  notification: NotificationSlice,
  profile: profileReducer,
  message: messageReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
=======
import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "../src/redux/AuthSlice";
// import SocialMediaMemoriesReducer from "./redux/SocialMediaMemoriesSlice";
// import socialMediaUserDataReducer from "./redux/SocialMediaUserSlice";
// import storage from "redux-persist/lib/storage";
// import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
// import SearchReducer from "./redux/SearchSlice";
// import HomeReducer from "./redux/SocialMediaHomeSlice";
// import UtilitiesSlice from "./redux/UtilitiesSlice";
// import NotificationSlice from "./redux/Notifications";
// import profileReducer from "./redux/ProfileSlice";
// import messageReducer from "./redux/MessageSlice";
import rootReducer from "./combinedReducer";

// const persistConfig = {
//   key: "root",
//   storage,
//   whitelist: [
//     "auth",
//     "memories",
//     "socialMediaUser",
//     "search",
//     "home",
//     "utilities",
//     "notification",
//     "profile",
//     "message",
//   ],
// };

// const rootReducer = combineReducers({
//   auth: authReducer,
//   memories: SocialMediaMemoriesReducer,
//   socialMediaUser: socialMediaUserDataReducer,
//   search: SearchReducer,
//   home: HomeReducer,
//   utilities: UtilitiesSlice,
//   notification: NotificationSlice,
//   profile: profileReducer,
//   message: messageReducer,
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: rootReducer,
>>>>>>> defdabe (NEW)
  middleware: [thunk],
});

export default store;
