import { useState } from "react";
import styled from "styled-components";
import LoginFormInput from "./LoginFormInput";

const LoginForm = () => {
  const [inputDataError, setInputDataError] = useState<string>("");
  const [loginFormData, setLoginFormData] = useState<LoginFormData>({
    password: "",
    email: "",
  });

  const loginHandler = ()=>{

  }

  return (
    <Column id="column">
      <Row>
        <LoginFormInput
          fieldName="email"
          value={loginFormData.email}
          type="text"
          data={loginFormData}
          setData={setLoginFormData}
        />

        <LoginFormInput
          fieldName="password"
          value={loginFormData.password}
          type="password"
          data={loginFormData}
          setData={setLoginFormData}
        />
      </Row>
      <ButtonStyle onClick={loginHandler}>Register</ButtonStyle>
      {inputDataError === "" ? (
        ""
      ) : (
        <ErrorMessageStyle>
          <ErrorTextMessage>{inputDataError}</ErrorTextMessage>
        </ErrorMessageStyle>
      )}
    </Column>
  );
};

interface LoginFormData {
  email: string;
  password: string;
}

const ErrorMessageStyle = styled.div`
  border: 2px solid red;
  padding: 2rem;
`;

const ErrorTextMessage = styled.h2`
  color: black;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`;

const ButtonStyle = styled.button`
  background-color: #8ea7e9;
  width: 8rem;
  height: 3rem;
  border-radius: 20px;
  border-color: #8ea7e9;
  color: #fff2f2;
  font-size: 1rem;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
  align-content: space-around;
  height: 100%;
  justify-content: space-around;
  /* justify-content: space-between; */
`;

export default LoginForm;
