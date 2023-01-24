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
    password: "",
  });
  return (
    <RegisterFormStyle>
      <Column>
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
            type="tel"
            data={data}
            setData={setData}
          />
        </Row>
        <button>Register</button>
      </Column>
    </RegisterFormStyle>
  );
};

interface FormData {
  name: string;
  surname: string;
  nick: string;
  email: string;
  phone: string;
  password: string;
}

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`;

const RegisterFormStyle = styled.div`
  height: 80%;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
  align-content: space-around;

  /* justify-content: space-between; */
`;

export default RegisterForm;
