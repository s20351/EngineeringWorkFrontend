import { ReactElement } from "react";
import { StyledButton } from "./styledButton";

interface ButtonProps {
  text: string;
  handleClick: () => void;
}

const Button = ({ handleClick, text }: ButtonProps): ReactElement => {
  return (
    <StyledButton type="button" onClick={() => handleClick()}>
      {text}
    </StyledButton>
  );
};

export { Button };
