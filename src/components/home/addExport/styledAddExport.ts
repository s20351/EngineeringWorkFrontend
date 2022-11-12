import styled from "@emotion/styled";
import { Button } from "@mui/material";

const StyledFieldSet = styled.fieldset`
  display: flex;
  flex-direction: column;
`;

const StyledDiv = styled.div`
  display: flex;
  width: 20rem;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const StyledButton = styled(Button)`
  color: rgb(249, 228, 91);
  background-color: rgb(43, 103, 119);
  border: 1px solid black;
  width: 5rem;
  height: 2rem;
  margin-top: 0.6rem;
  align-items: center;
`;

export { StyledFieldSet, StyledDiv, StyledButton };
