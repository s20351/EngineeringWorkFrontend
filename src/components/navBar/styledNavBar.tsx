import styled from "@emotion/styled";
import { Button } from "@mui/material";

const StyledNavBar = styled.ul`
  display: flex;
  flex-direction: row;
  list-style-type: none;
  // background-color: rgb(33, 35, 39);
  color: white;
`;

const StyledButton = styled(Button)`
  color: red;
`;

const StyledLi = styled.li`
  margin-left: 1rem;
`;

export { StyledNavBar, StyledLi, StyledButton };
