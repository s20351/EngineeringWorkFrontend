import { useState } from "react";
import { NavBar } from "./components";
import { ClickCounter } from "./components/clickCounter";

function App() {
  const [page, setPage] = useState(0);

  const handlePageChange = (pageNumber: number): void => {
    setPage(pageNumber);
    console.log(pageNumber);
  };

  return (
    <>
      <NavBar handleChangePage={handlePageChange} />
      {page === 1 && <ClickCounter />}
    </>
  );
}

export default App;
