import { Button } from "antd";
import { useContext, useState } from "react";
import { FarmerContext } from "../../providers/FarmerDataProvider";
import { StyledDiv, StyledSpan } from "./styledLoginPage";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const navigate = useNavigate();
  function login(){
  navigate('/home')
  }

  return (
    <StyledDiv>
      <StyledSpan>Siemanko</StyledSpan>
      <StyledSpan>
        <label htmlFor="password">Password</label>
        <input id="password" type="password"></input>
      </StyledSpan>
      <Button onClick={() => {login()}}>Log in</Button>
    </StyledDiv>
  );
};

export { LoginPage };
