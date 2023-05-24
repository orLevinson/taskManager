import { Route, Routes } from "react-router-dom";
import ListPage from "./pages/ListPage";
import Navbar from "./shared/UIElements/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<ListPage />} />
        <Route path="about" element={<ListPage />} />
      </Routes>
    </>
  );
};

export default App;
