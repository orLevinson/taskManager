import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import ListContextProvider from "./shared/context/ListContextProvider";
import { BrowserRouter } from "react-router-dom";
import SectorContextProvider from "./shared/context/SectorContextProvider";
import UserContextProvider from "./shared/context/UserContextProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <UserContextProvider>
      <SectorContextProvider>
        <ListContextProvider>
          <App />
        </ListContextProvider>
      </SectorContextProvider>
    </UserContextProvider>
  </BrowserRouter>
);
