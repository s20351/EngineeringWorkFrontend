import { useNavigate } from 'react-router';
import { StyledButton, StyledDiv } from "./styled404";

export const NotFound = () => {
 const navigate = useNavigate();
  const goBack = () => {
    navigate('/')
  };
  return (
    <StyledDiv>
        Ups... chyba nie powinno Cię tu być ;c
        <StyledButton type="submit"onClick={() => {goBack() }} >Zaloguj się ponownie</StyledButton>
    </StyledDiv>
  );
};