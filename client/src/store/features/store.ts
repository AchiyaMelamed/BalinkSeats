import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { apiAuthSlice } from "../../features/api/apiAuthSlice";
import { apiDataSlice } from "../../features/api/apiDataSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiAuthSlice.reducerPath]: apiAuthSlice.reducer,
    [apiDataSlice.reducerPath]: apiDataSlice.reducer,
  },
  middleware: (getDefaultMiddleware): any =>
    getDefaultMiddleware().concat([
      apiAuthSlice.middleware,
      apiDataSlice.middleware,
    ]),
});

setupListeners(store.dispatch);

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
