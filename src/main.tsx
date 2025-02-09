import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./index.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { Provider } from "react-redux";
import { store } from "./store/store.ts";

ReactDOM.createRoot(
  document.getElementById("root") as ReactDOM.Container
).render(
  <Provider store={store}>
    <App />
  </Provider>
);
