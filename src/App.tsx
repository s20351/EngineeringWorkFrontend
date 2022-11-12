import { useContext } from "react";
import { Route, Routes } from "react-router";
import { LoginPage } from "./pages/Login/";
import { NavBar } from "./components";
import { HomePage } from "./pages/HomePage/HomePage";
import { FarmerContext } from "./providers/FarmerDataProvider";

function App() {
  const { data, setData } = useContext(FarmerContext);

  console.log(data);
  return (
    <Routes>
      <Route index element={<LoginPage />} />
      <Route path="home" element={<HomePage />} />
    </Routes>
  );
}

export default App;
