import { StyledNavBar, StyledLi, StyledButton, H1 } from "./styledNavBar";

interface NavBarProps {
  handleChangePage: (pageNumber: number) => void;
}

const NavBar = ({ handleChangePage }: NavBarProps) => {
  return (
    
    <StyledNavBar>
      <StyledLi>
        <StyledButton variant="contained" onClick={() => handleChangePage(1)}>
          <H1>Home</H1>
        </StyledButton>
      </StyledLi>
      <StyledLi>
        <StyledButton variant="contained" onClick={() => handleChangePage(2)}>
          <H1>Hodowla</H1>
        </StyledButton>
      </StyledLi>
      <StyledLi>
        <StyledButton variant="contained" onClick={() => handleChangePage(3)}>
          <H1>Pasza</H1>
        </StyledButton>
      </StyledLi>
      <StyledLi>
        <StyledButton variant="contained" onClick={() => handleChangePage(4)}>
          <H1>Hodowcy</H1>
        </StyledButton>
      </StyledLi>
      <StyledLi>
        <StyledButton variant="contained" onClick={() => handleChangePage(5)}>
          <H1>INDOS</H1>
        </StyledButton>
      </StyledLi>
    </StyledNavBar>
  );
};

export { NavBar };
