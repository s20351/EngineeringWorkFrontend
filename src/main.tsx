import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { FarmerDataProvider } from "./providers/FarmerDataProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <FarmerDataProvider>
        <App />
      </FarmerDataProvider>
    </BrowserRouter>
  </React.StrictMode>
);
