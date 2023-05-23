import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import ListContextProvider from "./shared/context/ListContextProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ListContextProvider>
    <App />
  </ListContextProvider>
);
