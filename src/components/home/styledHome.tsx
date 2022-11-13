import styled from "@emotion/styled";
import { Button } from "@mui/material";

const StyledHomeLayout = styled.div`
  border: 0;
  flex-direction: column;
  display: flex;
  width: fit-content;
  margin: auto;
`;

const StyledLoadingInfo = styled.div`
  align-items: center; 
  margin-bottom: 1rem;
`

const StyledButton = styled(Button)`
  color: rgb(249, 228, 91);
  background-color: 	rgb(	43, 103, 119);
  border: 1px solid black;
  width: 13rem;
  height: 4rem;
`;

const StyledHome = styled.ul`
  flex-direction: row;
  list-style-type: none;
  background-color: rgb(27, 77, 137);
  height: 6.5rem;
  border: 1px solid black;
`;
const H1 = styled.h1`
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`
const InputLabel = styled.label`
  color: black;
  font-size: 2rem;
  font-family: 'Roboto Medium', sans-serif;
  font-weight: bold;
  display: flex;
  width: fit-content;
  margin: auto;
`;
const StyledDivButtons = styled("div")`
  display: flex;
  margin-top: 1rem;
  margin-bottom: 1.5rem;
  background-color: white;
  border: 1px solid black;
`;

const StyledDivLabel = styled.div`
  display: flex;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  background-color: white;
  margin-left: 1rem;
  margin-right: 1rem;
`;

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  margin-top: 2rem;
`;


export { StyledDiv, StyledDivButtons, InputLabel, StyledDivLabel, StyledHomeLayout, StyledButton, StyledHome, H1, StyledLoadingInfo}