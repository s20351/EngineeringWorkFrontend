import { ReactElement } from "react";
import {  Feed ,NavBar } from "../../components";
import { StyledAppLayout } from "../../styledApp";

const FeedPage = (): ReactElement => {
  return (
    <>
      <NavBar />
      <StyledAppLayout>
        {<Feed />}
      </StyledAppLayout>
    </>
  );
};

export { FeedPage };
