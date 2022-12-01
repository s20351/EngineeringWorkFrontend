import { useContext } from "react";
import { Route, Routes } from "react-router";
import { LoginPage } from "./pages/login/LoginPage";
import { FarmerContext } from "./providers/FarmerDataProvider";
import { BreedingPage } from "./pages/breedingPage/BreedingPage";
import { FeedPage} from "./pages/feedPage/FeedPage";
import { IndosPage } from "./pages/indosPage/IndosPage";
import { FarmersPage } from "./pages/farmersPage/FarmersPage";
import { ErrorPage } from "./pages/errorPage/ErrorPage";
import { RegisterPage } from "./pages/registerPage/RegisterPage";
import { HomePage } from "./pages/homePage/HomePage";

function App() {
  return (
    <Routes>
      <Route index element={<LoginPage />} />
      <Route path="home" element={<HomePage />} />
      <Route path="hodowla" element={<BreedingPage />} />
      <Route path="pasza" element={<FeedPage />} />
      <Route path="hodowcy" element={<FarmersPage />} />
      <Route path="indos" element={<IndosPage />} />
      <Route path="rejestracja" element={<RegisterPage />} />
      <Route path="*" element ={<ErrorPage/>} />
    </Routes>
  );
}

export default App;
