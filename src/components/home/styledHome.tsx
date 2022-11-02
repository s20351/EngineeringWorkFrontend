import styled from "@emotion/styled";
import { Button } from "@mui/material";

const StyledHomeLayout = styled.div`
  height: 34rem;
  margin-top: 2rem;
  align-items: center;
`;

const StyledButton = styled(Button)`
  color: rgb(249, 228, 91);
  background-color: 	rgb(	43, 103, 119);
  border: 1px solid black;
  width: 15rem;
  height: 4rem;
  margin-top: 1rem;
  margin-left: 1rem;
  left: 37%
`;

const StyledLi = styled.li`

`;

const StyledHome = styled.ul`
  flex-direction: row;
  list-style-type: none;
  background-color: rgb(27, 77, 137);
  height: 6.5rem;
  border: 1px solid black;
  margin: 0.0em 0.0em 0.0em 0.0em;
  padding: 0em 1em 0em 0em;
`;
const H1 = styled.h1(
    {
      fontSize: 17
    },
    props => ({ color: props.color })
  )

export {StyledHomeLayout, StyledButton, StyledLi, StyledHome, H1}