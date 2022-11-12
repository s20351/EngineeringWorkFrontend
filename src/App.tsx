import { useState } from "react";
import { Router, Route, Routes } from "react-router";
import { NavBar, Home, Indos, Feed, Farmers, Breeding } from "./components";
import { StyledAppLayout } from "./styledApp";

function App() {
  const [page, setPage] = useState(0);

  const handlePageChange = (pageNumber: number): void => {
    setPage(pageNumber);
  };

  return (
    <>
      <NavBar handleChangePage={handlePageChange} />
      <StyledAppLayout>
        {page === 1 && <Home />}
        {page === 2 && <Breeding />}
        {page === 3 && <Feed />}
        {page === 4 && <Farmers />}
        {page === 5 && <Indos />}
      </StyledAppLayout>
    </>
  );
}

export default App;
