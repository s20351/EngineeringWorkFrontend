import { Button } from "antd";
import { useContext, useState } from "react";
import { FarmerContext } from "../../providers/FarmerDataProvider";
import { StyledDiv, StyledSpan } from "./styledLoginPage";

const LoginPage = () => {
  const [data, setData] = useContext(FarmerContext);

  const handleLogin = () => {
    setData();
  };
  return (
    <StyledDiv>
      <StyledSpan>Siemanko</StyledSpan>
      <StyledSpan>
        <label htmlFor="password">Password</label>
        <input id="password" type="password"></input>
      </StyledSpan>
      <Button onClick={() => {}}>Log in</Button>
    </StyledDiv>
  );
};

export { LoginPage };
