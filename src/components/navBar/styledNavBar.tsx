import styled from "@emotion/styled";
import { Button } from "@mui/material";

const StyledNavBar = styled.ul`
  display: flex;
  justify-content: center;
  flex-direction: row;
  list-style-type: none;
  background-color: rgb(27, 77, 137);
  height: 6.5rem;
  border: 1px solid black;
  margin: 0em;
  padding: 0em;
  align-items: center;
`;

const StyledLi = styled.li`
  margin-left: 0.5rem;
`;

const StyledButton = styled(Button)`
  color: rgb(249, 228, 91);
  background-color: rgb(43, 103, 119);
  border: 1px solid black;
  width: 15rem;
  height: 4rem;
  //left: 26rem; // different setup in different screen resoultion
  align-items: center;
`;

const H1 = styled.h1(
  {
    fontSize: 17,
  },
  (props) => ({ color: props.color })
);

export { StyledNavBar, StyledLi, StyledButton, H1 };
