import styled from "@emotion/styled";

const StyledFieldSet = styled.fieldset`
  border: 0;
  flex-direction: column;
`;

const StyledDiv = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
`;

const InputLabel = styled.label`
  color: black;
  left: 55px;
  margin-top: 0.8rem;
  text-align: right;
  font-size: 2rem;
`;

export { StyledFieldSet, StyledDiv, InputLabel };
