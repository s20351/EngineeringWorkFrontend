import { useContext, useState } from "react";
import { FarmerContext } from "../../providers/FarmerDataProvider";
import { StyledButton, StyledDiv, StyledH1 } from "./styledRegisterPage";
import { useNavigate } from "react-router";
import { Formik, Form } from "formik";
import './RegisterPage.css'
import { Login, Register } from "../../services/apiService";
import Swal from 'sweetalert2';
import { Backdrop, CircularProgress } from "@mui/material";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>();

  const { setData } = useContext(FarmerContext);
  
  function login(){
    navigate('/')
  }
  
  function register(){

      if(email != "" && name != "" && surname != "" && password != "")
      {
        var response =  Register(email,password,name,surname)
        setIsLoading(true)
        response.then(function(result){
          if(result?.status == 200){
            setIsLoading(false)
            result.json().then(userId => {
              setData(userId)
            })
            Swal.fire({
              title: 'Pomyślnie dodano użytkownika',
              icon: 'success',
              confirmButtonColor: 'rgb(43, 103, 119)',
            });
            navigate('/')
          }
        }) 
      }else{
        setIsLoading(false)
        Swal.fire({
          title: 'Musisz uzupełnić wszystkie pola',
          icon: 'error',
          confirmButtonColor: 'rgb(43, 103, 119)',
        });
      }
  }

  const initialValues = {
    username: "",
    password: ""
  };

  return (
    <div className="col-md-12">
    <div className="card card-container">
    <StyledH1>Rejestracja</StyledH1>
      <Formik
        initialValues={initialValues}
        onSubmit={register}
      >
        <Form>
        <StyledDiv className="form-group">
            <label htmlFor="name" typeof="text">Imię</label>
            <input
                  name="name"
                  id="name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
          </StyledDiv>
        <StyledDiv className="form-group">
            <label htmlFor="surname" typeof="text">Nazwisko</label>
            <input
                  name="surname"
                  id="surname"
                  type="text"
                  value={surname}
                  onChange={(event) => setSurname(event.target.value)}
                />
          </StyledDiv>
          <StyledDiv className="form-group">
            <label htmlFor="email" typeof="email">Email</label>
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
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
          </StyledDiv>
          <StyledDiv className="form-group">
              <StyledButton type="submit">Zarejestruj</StyledButton>
          </StyledDiv>
        </Form>
      </Formik>
      <StyledDiv className="form-group">
              <StyledButton type="submit"onClick={() => {login() }} >Logowanie</StyledButton>
      </StyledDiv>
      {!isLoading? null : 
      <Backdrop open>
        <CircularProgress color="inherit"/>
      </Backdrop>
      }
    </div>
  </div>
  );
};

export { RegisterPage };
