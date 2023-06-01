import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import AuthPage from "./pages/AuthPage";
import ListPage from "./pages/ListPage";
import userCtx from "./shared/context/UserCtx";
import LoadingOverlay from "./shared/UIElements/LoadingOverlay";
import Navbar from "./shared/UIElements/Navbar";

const App = () => {
  const { token, is_admin, room_id } = useContext(userCtx);

  return (
    <>
      <LoadingOverlay />
      <Navbar />
      <Routes>
        {token && room_id && <Route index element={<ListPage />} />}
        <Route path="auth" element={<AuthPage />} />
        {is_admin && <Route path="admin" element={<AdminPage />} />}
      </Routes>
    </>
  );
};

export default App;
