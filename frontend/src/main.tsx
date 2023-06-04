import * as ReactDOM from "react-dom/client";
import App from "./App.tsx";
import ListContextProvider from "./shared/context/ListContextProvider";
import { BrowserRouter } from "react-router-dom";
import SectorContextProvider from "./shared/context/SectorContextProvider";
import UserContextProvider from "./shared/context/UserContextProvider";
import LoadingContextProvider from "./shared/context/LoadingContextProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <LoadingContextProvider>
      <UserContextProvider>
        <SectorContextProvider>
          <ListContextProvider>
            <App />
          </ListContextProvider>
        </SectorContextProvider>
      </UserContextProvider>
    </LoadingContextProvider>
  </BrowserRouter>
);
