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
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export default store;
