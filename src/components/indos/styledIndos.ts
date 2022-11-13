import styled from "@emotion/styled";
import { Button } from "@mui/material";

const StyledButton = styled(Button)`
  color: rgb(249, 228, 91);
  background-color: 	rgb(	43, 103, 119);
  border: 1px solid black;
  width: 15rem;
  height: 4rem;
`;

const StyledLi = styled.li`

`;
const StyledDivButtons = styled("div")`
  display: flex;
  margin-top: 1rem;
  margin-bottom: 1.5rem;
  background-color: white;
  border: 1px solid black;
`;

const StyledFieldSet = styled.fieldset`
  border: 0;
  flex-direction: column;
  display: flex;
`;

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  margin-top: 2rem;
  z-index: 1000;
`;

const H1 = styled.h1`
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`
const StyledDivLabel = styled.div`
  display: flex;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  background-color: white;
  margin-left: 1rem;
`;


export { StyledDivLabel, StyledDivButtons, StyledFieldSet, StyledButton, StyledLi, StyledDiv, H1}