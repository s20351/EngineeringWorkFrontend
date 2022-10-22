import { StyledNavBar, StyledLi, StyledButton } from "./styledNavBar";
import { Button } from "@mui/material";

interface NavBarProps {
  handleChangePage: (pageNumber: number) => void;
}

const NavBar = ({ handleChangePage }: NavBarProps) => {
  return (
    <StyledNavBar>
      <StyledLi>
        <StyledButton variant="contained" onClick={() => handleChangePage(1)}>
          First page
        </StyledButton>
      </StyledLi>
      <StyledLi>
        <StyledButton variant="contained" onClick={() => handleChangePage(2)}>
          Second page
        </StyledButton>
      </StyledLi>
      <StyledLi>
        <StyledButton variant="contained" onClick={() => handleChangePage(3)}>
          Third page
        </StyledButton>
      </StyledLi>
    </StyledNavBar>
  );
};

export { NavBar };
