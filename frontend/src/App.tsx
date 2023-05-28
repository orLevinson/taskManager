import { Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import ListPage from "./pages/ListPage";
import Navbar from "./shared/UIElements/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<ListPage />} />
        <Route path="auth" element={<AuthPage />} />
      </Routes>
    </>
  );
};

export default App;
