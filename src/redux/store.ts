import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import userReducer from "./reducers/user";
import appReducer from "./reducers/app";

const createNoopStorage = () => {
    return {
        getItem() {
            return Promise.resolve(null);
        },
        setItem(_key: string, value: string) {
            return Promise.resolve(value);
        },
        removeItem() {
            return Promise.resolve();
        },
    };
};


export const reducers = combineReducers({
    userDetails: userReducer,
    appDetails: appReducer,
});

const persistConfig = {
    key: "swimato-ui",
    storage: typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage(),
    whitelist: ["userDetails"]
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});

export type RootState = ReturnType<typeof store.getState>

export const persistor = persistStore(store);