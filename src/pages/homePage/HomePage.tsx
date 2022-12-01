import { ReactElement, useContext } from "react";
import {  Home,NavBar } from "../../components";
import { NotFound } from "../../components/errors/404";
import { FarmerContext } from "../../providers/FarmerDataProvider";
import { StyledAppLayout } from "../../styledApp";

const HomePage = (): ReactElement => {
  const { data } = useContext(FarmerContext);
  return (
    data.id != -1 ? 
    <>
      <NavBar />
      <StyledAppLayout>
        {<Home />}
      </StyledAppLayout>
    </>
    : 
    <>
      <NotFound/>
    </>
  );
};

export { HomePage };
