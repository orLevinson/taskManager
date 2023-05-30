import { Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import ListPage from "./pages/ListPage";
import LoadingOverlay from "./shared/UIElements/LoadingOverlay";
import Navbar from "./shared/UIElements/Navbar";

const App = () => {
  return (
    <>
      <LoadingOverlay />
      <Navbar />
      <Routes>
        <Route index element={<ListPage />} />
        <Route path="auth" element={<AuthPage />} />
      </Routes>
    </>
  );
};

export default App;
