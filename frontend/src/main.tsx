import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import ListContextProvider from "./shared/context/ListContextProvider";
import { BrowserRouter } from "react-router-dom";
import SectorContextProvider from "./shared/context/SectorContextProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <SectorContextProvider>
    <ListContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ListContextProvider>
  </SectorContextProvider>
);
