import { StyledButton } from "./styledButton";

interface ButtonProps {
  text: string;
  handleClick: () => void;
}

const Button = ({ handleClick, text }: ButtonProps) => {
  return (
    <StyledButton type="button" onClick={() => handleClick()}>
      {text}
    </StyledButton>
  );
};

export { Button };
