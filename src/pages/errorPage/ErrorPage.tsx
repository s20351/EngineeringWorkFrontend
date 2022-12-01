import { ReactElement } from "react";
import { NotFound } from "../../components/errors/404";
import { StyledAppLayout } from "../../styledApp";

const ErrorPage = (): ReactElement => {
  return (
    <>
      <StyledAppLayout>
        {<NotFound />}
      </StyledAppLayout>
    </>
  );
};

export { ErrorPage };
