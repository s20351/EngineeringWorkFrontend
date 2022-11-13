import { ReactElement } from "react";
import {  Indos ,NavBar } from "../../components";
import { StyledAppLayout } from "../../styledApp";

const IndosPage = (): ReactElement => {
  return (
    <>
      <NavBar />
      <StyledAppLayout>
        {<Indos />}
      </StyledAppLayout>
    </>
  );
};

export { IndosPage };
