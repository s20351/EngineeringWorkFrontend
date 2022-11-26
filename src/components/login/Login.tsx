import { useContext, useState } from "react";
import { FarmerContext } from "../../providers/FarmerDataProvider";
import { StyledH1, StyledButton, StyledDiv } from "./styledLogin";
import { useNavigate } from "react-router";
import { Formik, Form } from "formik";
import './LoginPage.css'
import Swal from 'sweetalert2';
import { Login } from "../../services";

const LoginComponent = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { setData } = useContext(FarmerContext);
  function register(){
    navigate("/rejestracja")
  }
  function login(){
      var response =  Login(email, password)
      response.then(function(result){
        if(result?.status == 200){
          result.json().then(userId => {
            setData(userId)
          })
          navigate('/home')
        }else{
          Swal.fire({
            title: 'Złe dane logowania',
            icon: 'error',
            confirmButtonColor: 'rgb(43, 103, 119)',
          });
        }
      }) 
  }

  const initialValues = {
    username: "",
    password: "",
  };

  return (
    <div className="col-md-12">
    <div className="card card-container">
    <StyledH1>Logowanie</StyledH1>
      <Formik
        initialValues={initialValues}
        onSubmit={login}
      >
        <Form>
          <StyledDiv className="form-group">
            <label htmlFor="username" typeof="email">Email</label>
            <input
                  name="email"
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
          </StyledDiv>
          <StyledDiv className="form-group">
            <label htmlFor="password">Hasło</label>
                <input
                  name="password"
                  id="nazwa"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
          </StyledDiv>
          <StyledDiv className="form-group">
              <StyledButton type="submit">Zaloguj</StyledButton>
          </StyledDiv>
        </Form>
      </Formik>
      <StyledDiv className="form-group">
              <StyledButton type="submit"onClick={() => {register() }} >Rejestracja</StyledButton>
      </StyledDiv>
    </div>
  </div>
  );
};

export { LoginComponent };
