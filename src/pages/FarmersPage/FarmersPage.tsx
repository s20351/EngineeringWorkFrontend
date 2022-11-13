import { ReactElement } from "react";
import {  Farmers ,NavBar } from "../../components";
import { StyledAppLayout } from "../../styledApp";

const FarmersPage = (): ReactElement => {
  return (
    <>
      <NavBar />
      <StyledAppLayout>
        {<Farmers />}
      </StyledAppLayout>
    </>
  );
};

export { FarmersPage };
