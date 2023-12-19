import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const authPersistConfig = {
  key: "auth",
  storage,
};

const memoriesPersistConfig = {
  key: "memories",
  storage,
};

const socialMediaUserPersistConfig = {
  key: "socialMediaUser",
  storage,
};

const searchPersistConfig = {
  key: "search",
  storage,
};

const utilitiesPersistConfig = {
  key: "utilities",
  storage,
};

const profilePersistConfig = {
  key: "profile",
  storage,
};

const messagePersistConfig = {
  key: "message",
  storage,
};

const wrapReducerWithPersistConfig = (reducer, persistConfig) => {
  return persistReducer(persistConfig, reducer);
};

export {
  authPersistConfig,
  memoriesPersistConfig,
  socialMediaUserPersistConfig,
  searchPersistConfig,
  utilitiesPersistConfig,
  profilePersistConfig,
  messagePersistConfig,
  wrapReducerWithPersistConfig,
};
