import styled, { StyledComponent } from "@emotion/styled";

const StyledDiv = styled("div")`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  justify-content: center;
  align-items: center;
  width: fit-content;
  margin: auto;
  margin-top: 20rem;
`;

const StyledSpan = styled("span")`
  width: 7rem;
  height: 2rem;
`;

export { StyledDiv, StyledSpan };
