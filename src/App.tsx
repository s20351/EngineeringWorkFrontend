import { useContext } from "react";
import { Route, Routes } from "react-router";
import { LoginPage } from "./pages/Login/LoginPage";
import { HomePage } from "./pages/HomePage/HomePage";
import { FarmerContext } from "./providers/FarmerDataProvider";
import { BreedingPage } from "./pages/BreedingPage/BreedingPage";
import { FeedPage} from "./pages/FeedPage/FeedPage";
import { IndosPage } from "./pages/IndosPage/IndosPage";
import { FarmersPage } from "./pages/FarmersPage/FarmersPage";

function App() {
  return (
    <Routes>
      <Route index element={<LoginPage />} />
      <Route path="home" element={<HomePage />} />
      <Route path="hodowla" element={<BreedingPage />} />
      <Route path="pasza" element={<FeedPage />} />
      <Route path="hodowcy" element={<FarmersPage />} />
      <Route path="indos" element={<IndosPage />} />
    </Routes>
  );
}

export default App;
