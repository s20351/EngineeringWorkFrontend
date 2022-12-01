import { ReactElement, useContext } from "react";
import {  Indos ,NavBar } from "../../components";
import { NotFound } from "../../components/errors/404";
import { FarmerContext } from "../../providers/FarmerDataProvider";
import { StyledAppLayout } from "../../styledApp";

const IndosPage = (): ReactElement => {
  const { data } = useContext(FarmerContext);
  return (
    data.id != -1 ? 
    <>
      <NavBar />
      <StyledAppLayout>
        {<Indos />}
      </StyledAppLayout>
    </>
        : 
        <>
          <NotFound/>
        </>
  );
};

export { IndosPage };
