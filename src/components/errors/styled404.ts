import styled, { StyledComponent } from "@emotion/styled";
import { Button } from "@mui/material";

const StyledDiv = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: fit-content;
  margin: auto;
  font-size: 3rem;
`;

const StyledSpan = styled("span")`
  width: 7rem;
  height: 2rem;
`;

const StyledButton = styled(Button)`
  color: rgb(249, 228, 91);
  background-color: rgb(43, 103, 119);
  border: 1px solid black;
  width: 10rem;
  height: 5rem;
  margin-top: 0.6rem;
`;

export { StyledDiv, StyledSpan, StyledButton };
