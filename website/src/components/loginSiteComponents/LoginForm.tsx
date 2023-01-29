import { useState } from "react";
import styled from "styled-components";
import LoginFormInput from "./LoginFormInput";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//Redux
import type { RootState } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { setUserData } from "../../store/slicers/userDataSlicer";

//FontAwasome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

const LoginForm = () => {
  const navigate = useNavigate();
  const [waitingForData, setWaitingForData] = useState<boolean>(false);
  const [inputDataError, setInputDataError] = useState<string>("");
  const [loginFormData, setLoginFormData] = useState<LoginFormData>({
    password: "",
    email: "",
  });

  const userData = useSelector((state: RootState) => state.userData);
  const dispatch = useDispatch();

  const loginHandler = async () => {
    setInputDataError("");
    setWaitingForData(true);
    const result = await axios.post(
      "http://127.0.0.1:3000/login",
      loginFormData
    );
    console.log(result);
    if (result.data.operation) {
      dispatch(setUserData(result.data.data));
      setWaitingForData(false);
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
      <ButtonStyle onClick={loginHandler}>Register</ButtonStyle>
      {inputDataError === "" ? (
        ""
      ) : (
        <ErrorMessageStyle>
          <ErrorTextMessage>{inputDataError}</ErrorTextMessage>
        </ErrorMessageStyle>
      )}

      {waitingForData ? (
        <WaitingDiv>
          <WaitingText>Waiting...</WaitingText>
          <Icon icon={faCircleNotch} className="fa-spin" />
        </WaitingDiv>
      ) : (
        ""
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
`;

const WaitingDiv = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  top: 0;
  left: 0;
`;

const WaitingText = styled.h1`
  color: #3454d6;
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 8rem;
  color: #3454d6;
`;

export default LoginForm;
