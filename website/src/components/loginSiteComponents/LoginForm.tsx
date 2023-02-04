import { useState } from "react";
import styled from "styled-components";
import LoginFormInput from "./LoginFormInput";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useCookies from "react-cookie/cjs/useCookies";

//Redux
import type { RootState } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { setUserData } from "../../store/slicers/userDataSlicer";
import { change } from "../../store/slicers/loginSlicer";

//Helping components
import WaitingDiv from "../helpingComponents/WaitingDiv";

const LoginForm = () => {
  const navigate = useNavigate();
  const [waitingForData, setWaitingForData] = useState<boolean>(false);
  const [inputDataError, setInputDataError] = useState<string>("");
  const [loginFormData, setLoginFormData] = useState<LoginFormData>({
    password: "",
    email: "",
  });

  const [cookie, setCookie, removeCookie] = useCookies(["user"]);

  const userData = useSelector((state: RootState) => state.userData);
  const dispatch = useDispatch();

  const loginHandler = async () => {
    setInputDataError("");
    setWaitingForData(true);
    const result = await axios.get(
      "http://127.0.0.1:3000/login",
      {params:loginFormData}
    );
    console.log(result);
    if (result.data.operation) {
      console.log(result.data);
      dispatch(setUserData(result.data.data));
      dispatch(change());
      setWaitingForData(false);
      setCookie("user", result.data.data.id, { path: "/" });
      navigate("/main");
    } else {
      setInputDataError(result.data.errorMessage);
    }
    setWaitingForData(false);
  };

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
      <ButtonStyle onClick={loginHandler}>Login</ButtonStyle>
      {inputDataError === "" ? (
        ""
      ) : (
        <ErrorMessageStyle>
          <ErrorTextMessage>{inputDataError}</ErrorTextMessage>
        </ErrorMessageStyle>
      )}

      {waitingForData ? <WaitingDiv /> : ""}
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
`;


export default LoginForm;
