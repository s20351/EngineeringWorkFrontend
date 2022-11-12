import { ReactElement, useState } from "react";
import { Route, Routes } from "react-router";
import { Breeding, Farmers, Feed, Home, Indos, NavBar } from "../../components";
import { StyledAppLayout } from "../../styledApp";

const HomePage = (): ReactElement => {
  const [page, setPage] = useState(0);

  const handlePageChange = (pageNumber: number): void => {
    setPage(pageNumber);
  };

  localStorage.setItem("farmerId", JSON.stringify(1));
  sessionStorage.setItem("farmerId", JSON.stringify(1));
  console.log(localStorage.getItem("farmerId"));

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
};

export { HomePage };
