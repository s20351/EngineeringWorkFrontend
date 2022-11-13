import { StyledNavBar, StyledLi, StyledButton, H1 } from "./styledNavBar";
import { useNavigate } from "react-router";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <StyledNavBar>
      <StyledLi>
        <StyledButton variant="contained" onClick={() => {navigate('/home')} }>
          <H1>Home</H1>
        </StyledButton>
      </StyledLi>
      <StyledLi>
        <StyledButton variant="contained" onClick={() => {navigate('/hodowla')}}>
          <H1>Hodowla</H1>
        </StyledButton>
      </StyledLi>
      <StyledLi>
        <StyledButton variant="contained" onClick={() => navigate('/pasza')}>
          <H1>Pasza</H1>
        </StyledButton>
      </StyledLi>
      <StyledLi>
        <StyledButton variant="contained" onClick={() => navigate('/hodowcy')}>
          <H1>Hodowcy</H1>
        </StyledButton>
      </StyledLi>
      <StyledLi>
        <StyledButton variant="contained" onClick={() => navigate('/indos')}>
          <H1>INDOS</H1>
        </StyledButton>
      </StyledLi>
    </StyledNavBar>
  );
};

export { NavBar };
