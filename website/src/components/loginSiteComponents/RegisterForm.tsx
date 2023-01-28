import { useState } from "react";
import styled from "styled-components";
import axios, { AxiosError } from "axios";

//FontAwasome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

//Components
import FormInput from "./FormInput";
import PasswordForm from "./PasswordForm";

const RegisterForm = ({setLoginForm,loginForm}:RegisterForm) => {
  const [data, setData] = useState<FormData>({
    name: "",
    surname: "",
    nick: "",
    email: "",
    phone: "",
  });
  const [inputDataError, setInputDataError] = useState<string>("");
  const [waitingForData, setWaitingForData] = useState<boolean>(false);
  const [passwordForm, setPasswordForm] = useState<boolean>(false);

  const sendDataHandler = async () => {
    const regexEmali = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    let newErrorMessage = "";

    const emailValidate = data.email.match(regexEmali);
    if (!emailValidate) {
      newErrorMessage = "Incorrect email";
    }

    if (
      data.surname === "" ||
      data.name === "" ||
      data.nick === "" ||
      data.phone === ""
    ) {
      newErrorMessage = "You must write informations in all inputs";
    }

    setInputDataError(newErrorMessage);
    console.log("weszlo");
    if (newErrorMessage === "") {
      setWaitingForData(true);
      console.log("tu");
      const sendData: SendData = {
        email: data.email,
        nick: data.nick,
      };
      try {
        const result = await axios.post(
          "http://127.0.0.1:3000/checkData",
          sendData
        );

        console.log(result);

        setWaitingForData(false);
        if (result.data.free) {
          setPasswordForm(true);
        } else {
          setInputDataError(result.data.errorMessage);
        }
      } catch (error) {
        const err = error as AxiosError;
        setWaitingForData(false);
        console.log(err);
        setInputDataError(err.message);
      }
    }
  };

  return (
    <Column id="column">
      {!passwordForm ? (
        <>
          <Row>
            <FormInput
              fieldName="name"
              value={data.name}
              type="text"
              data={data}
              setData={setData}
            />
            <FormInput
              fieldName="surname"
              value={data.surname}
              type="surname"
              setData={setData}
              data={data}
            />
          </Row>
          <Row>
            <FormInput
              fieldName="nick"
              value={data.nick}
              type="text"
              data={data}
              setData={setData}
            />

            <FormInput
              fieldName="email"
              value={data.email}
              type="email"
              setData={setData}
              data={data}
            />
          </Row>
          <Row>
            <FormInput
              fieldName="phone"
              value={data.phone}
              type="number"
              data={data}
              setData={setData}
            />
          </Row>
          <ButtonStyle onClick={sendDataHandler}>Register</ButtonStyle>
        </>
      ) : (
        <PasswordForm
          data={data}
          setPasswordForm={setPasswordForm}
          setInputDataError={setInputDataError}
          setWaitingForData={setWaitingForData}
          setLoginForm={setLoginForm} 
          loginForm={loginForm}
        />
      )}
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

interface FormData {
  name: string;
  surname: string;
  nick: string;
  email: string;
  phone: string;
}

interface SendData {
  nick: string;
  email: string;
}

const Icon = styled(FontAwesomeIcon)`
  font-size: 8rem;
  color: #3454d6;
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

  :hover {
    cursor: pointer;
  }
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

interface RegisterForm{
  setLoginForm:React.Dispatch<React.SetStateAction<boolean>>
  loginForm:boolean
}

export default RegisterForm;
