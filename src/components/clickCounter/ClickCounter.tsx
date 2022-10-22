import { useState } from "react";
import { Button } from "../button";
import { StyledButtonsWrapper, StyledDiv } from "./styledClickCounter";

const ClickCounter = () => {
  const [count, setCount] = useState(0);

  const handleAdd = () => {
    setCount(count + 1);
  };

  const handleReset = () => {
    setCount(0);
  };

  return (
    <StyledDiv>
      {`You clicked ${count} times`}
      <StyledButtonsWrapper>
        <Button text="Click me" handleClick={handleAdd} />
        <Button text="Reset counter" handleClick={handleReset} />
      </StyledButtonsWrapper>
    </StyledDiv>
  );
};

export { ClickCounter };
