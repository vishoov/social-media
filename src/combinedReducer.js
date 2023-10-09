import { combineReducers } from "@reduxjs/toolkit";
import {
  authPersistConfig,
  memoriesPersistConfig,
  messagePersistConfig,
  profilePersistConfig,
  searchPersistConfig,
  socialMediaUserPersistConfig,
  utilitiesPersistConfig,
  wrapReducerWithPersistConfig,
} from "./persistConfig";
import NonPersistMessageSlice from "./reduxNonPersist/NonPersistMessages";
import authReducer from "./redux/AuthSlice";
import SocialMediaMemoriesReducer from "./redux/SocialMediaMemoriesSlice";
import messageReducer from "./redux/MessageSlice";
import profileReducer from "./redux/ProfileSlice";
import SearchReducer from "./redux/SearchSlice";
import UtilitiesSlice from "./redux/UtilitiesSlice";
import socialMediaUserDataReducer from "./redux/SocialMediaUserSlice";
import NonPersistConversationSlice from "./reduxNonPersist/NonPersistConversationSlice";
import NonPersistForHomeSlice from "./reduxNonPersist/NonPersistForHomeSlice";
import NonPersistMemoriesSlice from "./reduxNonPersist/NonPersistMemoriesSlice";
import NonPersistNotificationSlice from "./reduxNonPersist/NonPersistNotificationSlice";
import NonPersistProfileSlice from "./reduxNonPersist/NonPersistProfileSlice";
import NonPersistSearchSlice from "./reduxNonPersist/NonPersistSearchSlice";

const rootReducer = combineReducers({
  // persist reducers
  auth: wrapReducerWithPersistConfig(authReducer, authPersistConfig),
  memories: wrapReducerWithPersistConfig(
    SocialMediaMemoriesReducer,
    memoriesPersistConfig
  ),
  message: wrapReducerWithPersistConfig(messageReducer, messagePersistConfig),
  profile: wrapReducerWithPersistConfig(profileReducer, profilePersistConfig),
  search: wrapReducerWithPersistConfig(SearchReducer, searchPersistConfig),
  socialMediaUser: wrapReducerWithPersistConfig(
    socialMediaUserDataReducer,
    socialMediaUserPersistConfig
  ),
  utilities: wrapReducerWithPersistConfig(
    UtilitiesSlice,
    utilitiesPersistConfig
  ),

  // non-persist reducers
  NonPersistMessage: NonPersistMessageSlice,
  NonPersistConversations: NonPersistConversationSlice,
  NonPersistForHome: NonPersistForHomeSlice,
  NonPersistMemories: NonPersistMemoriesSlice,
  NonPersistNotification: NonPersistNotificationSlice,
  NonPersistProfile: NonPersistProfileSlice,
  NonPersistSearch: NonPersistSearchSlice,
});

export default rootReducer;
