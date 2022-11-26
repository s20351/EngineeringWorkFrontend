import { ReactElement, useContext } from "react";
import {  BreedingComponent, NavBar } from "../../components";
import { NotFound } from "../../components/errors/404";
import { FarmerContext } from "../../providers/FarmerDataProvider";
import { StyledAppLayout } from "../../styledApp";

const BreedingPage = (): ReactElement => {
  const { data } = useContext(FarmerContext);
  return (
    data.id != -1 ? 
    <>
      <NavBar/>
      <StyledAppLayout>
        {<BreedingComponent />}
      </StyledAppLayout>
    </>
        : 
        <>
          <NotFound/>
        </>
  );
};

export { BreedingPage };
