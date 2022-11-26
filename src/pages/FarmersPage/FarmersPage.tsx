import { ReactElement, useContext } from "react";
import {  Farmers ,NavBar } from "../../components";
import { NotFound } from "../../components/errors/404";
import { FarmerContext } from "../../providers/FarmerDataProvider";
import { StyledAppLayout } from "../../styledApp";

const FarmersPage = (): ReactElement => {
  const { data } = useContext(FarmerContext);
  return (
    data.id != -1 ? 
    <>
      <NavBar />
      <StyledAppLayout>
        {<Farmers />}
      </StyledAppLayout>
    </>
        : 
        <>
          <NotFound/>
        </>
  );
};

export { FarmersPage };
