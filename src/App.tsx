import { useState } from "react";
import { NavBar, Home, Hodowla, Indos, Pasza, Hodowcy } from "./components";
import { StyledAppLayout } from "./styledApp";

function App() {
  const [page, setPage] = useState(0);

  const handlePageChange = (pageNumber: number): void => {
    setPage(pageNumber);
    console.log(pageNumber);
  };

  return (
    <>
      <NavBar handleChangePage={handlePageChange} />
      <StyledAppLayout>
      {page === 1 && <Home />} 
      {page === 2 && <Hodowla />} 
      {page === 3 && <Pasza />} 
      {page === 4 && <Hodowcy />}
      {page === 5 && <Indos />} 
      </StyledAppLayout>
    </>
  );
}

export default App;
