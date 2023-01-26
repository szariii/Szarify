import { useState } from "react";
import styled from "styled-components";
import FormInput from "./FormInput";

const RegisterForm = () => {
  const [data, setData] = useState<FormData>({
    name: "",
    surname: "",
    nick: "",
    email: "",
    phone: "",
  });
  const [inputDataError, setInputDataError] = useState<string>("");

  const sendDataHandler = () => {
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
  };

  return (
    <Column id="column">
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

interface FormData {
  name: string;
  surname: string;
  nick: string;
  email: string;
  phone: string;
}

const ErrorMessageStyle = styled.div`
  border: 2px solid red;
  padding: 2rem;
`;

const ErrorTextMessage = styled.h2`
  color: black;
`

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

export default RegisterForm;
