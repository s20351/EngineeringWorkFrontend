import styled from "@emotion/styled";
import { Button } from "@mui/material";

const StyledButton = styled(Button)`
  color: rgb(249, 228, 91);
  background-color: 	rgb(	43, 103, 119);
  border: 1px solid black;
  width: 15rem;
  height: 4rem;
  margin-top: 1rem;
  margin-left: 1rem;

`;

const StyledLi = styled.li`

`;

const StyledDiv = styled.div`
  display: flex;
  width: 35rem;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  flex-direction: column;
  margin-top: 2rem;
  z-index: 1000;
`;

const H1 = styled.h1(
    {
      fontSize: 17
    },
    props => ({ color: props.color })
  )

export { StyledButton, StyledLi, StyledDiv, H1}