import { ReactElement } from "react";
import {  Home,NavBar } from "../../components";
import { StyledAppLayout } from "../../styledApp";

const HomePage = (): ReactElement => {
  return (
    <>
      <NavBar />
      <StyledAppLayout>
        {<Home />}
      </StyledAppLayout>
    </>
  );
};

export { HomePage };