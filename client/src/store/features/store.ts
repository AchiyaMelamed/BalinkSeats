import { AnyAction, combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { apiAuthSlice } from "../../features/api/apiAuthSlice";
import { apiDataSlice } from "../../features/api/apiDataSlice";
import authReducer from "./authSlice";
import dataReducer from "./dataSlice";
import signedUserReducer from "./signedUserSlice";

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, signedUserReducer);

const appReducer = combineReducers({
  signed: persistedReducer,
  auth: authReducer,
  data: dataReducer,
});

const rootReducer = (state: any, action: AnyAction) => {
  if (action.type === "signed/logoutUser") {
    storage.removeItem("persist:root");

    state = {};
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: {
    rootReducer,
    signed: persistedReducer,
    auth: authReducer,
    data: dataReducer,
    [apiAuthSlice.reducerPath]: apiAuthSlice.reducer,
    [apiDataSlice.reducerPath]: apiDataSlice.reducer,
  },
  middleware: (getDefaultMiddleware: any): any =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([apiAuthSlice.middleware, apiDataSlice.middleware]),
});

export let persistor = persistStore(store);

setupListeners(store.dispatch);

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
