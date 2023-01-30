import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";

import App from "./App";
import { store } from "./store/features/store";
import { authApiSlice } from "./features/api/authApiSlice";

const isDev = process.env.NODE_ENV === "development";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  isDev ? (
    <React.StrictMode>
      <ApiProvider api={authApiSlice}>
        <Provider store={store}>
          <App />
        </Provider>
      </ApiProvider>
    </React.StrictMode>
  ) : (
    <App />
  )
);
