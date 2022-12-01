import styled from "@emotion/styled";

const StyledFieldSet = styled.fieldset`
  border: 0;
  flex-direction: column;
`;

const StyledDiv = styled.div`
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
`;

const StyledDivSelect = styled.div`
  display: flex;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  background-color: white;
  margin-left: 2rem;
  width: 10rem;
`;

const InputLabel = styled.label`
  color: black;
  margin-top: 0.8rem;
  font-size: 2rem;
  font-family: 'Roboto Medium', sans-serif;
  font-weight: bold;
`;

export {StyledDivLabel, StyledDivSelect, StyledFieldSet, StyledDiv, InputLabel };
