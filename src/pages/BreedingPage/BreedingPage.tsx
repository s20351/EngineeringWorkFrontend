import { ReactElement, useState } from "react";
import { Breeding, Farmers, Feed, Home, Indos, NavBar } from "../../components";
import { StyledAppLayout } from "../../styledApp";

const BreedingPage = (): ReactElement => {
  return (
    <>
      <NavBar/>
      <StyledAppLayout>
        {<Breeding />}
      </StyledAppLayout>
    </>
  );
};

export { BreedingPage };
