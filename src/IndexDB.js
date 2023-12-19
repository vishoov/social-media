import { openDB } from "idb";

const DB_NAME = "AUTH_DB";
const DB_VERSION = 1;
const DB_STORE_NAME = "AUTH_STORE";

const initiateDatabase = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(DB_STORE_NAME)) {
        const store = db.createObjectStore(DB_STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
        store.createIndex("resetIndex", "id", { unique: true });
      }
    },
  });
};

export const addAuthData = async (authData) => {
  try {
    const db = await initiateDatabase();
    const transaction = db.transaction(DB_STORE_NAME, "readwrite");
    const store = transaction.objectStore(DB_STORE_NAME);
    const data = await store.add(authData);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getAuthDataById = async (id) => {
  try {
    const db = await initiateDatabase();
    if (db.objectStoreNames.contains(DB_STORE_NAME)) {
      const transaction = db.transaction(DB_STORE_NAME, "readonly");
      const store = transaction.objectStore(DB_STORE_NAME);
      return await store.get(parseInt(id));
    } else {
      return null;
    }
  } catch (err) {
    console.log("Error getting");
    return null;
  }
};

export const deleteAuthData = async (id) => {
  try {
    const db = await initiateDatabase();
    if (db.objectStoreNames.contains(DB_STORE_NAME)) {
      const transaction = db.transaction(DB_STORE_NAME, "readwrite");
      const store = transaction.objectStore(DB_STORE_NAME);
      return await store.delete(parseInt(id));
    } else {
      return null;
    }
  } catch (err) {
    console.log("Error deleting");
    return null;
  }
}

