import styled from "styled-components";
import { useState } from "react";
import axios from "axios";

//FontAwasome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faL, faLongArrowLeft } from "@fortawesome/free-solid-svg-icons";

//Components
import PasswordFormInput from "./PasswordFormInput";

import settings from "../../settings.json"


const PasswordForm = ({
  setPasswordForm,
  setInputDataError,
  setWaitingForData,
  data,
  setLoginForm,
  loginForm,
}: PasswordForm) => {
  const [passwordData, setPasswordData] = useState<PasswordData>({
    password: "",
    repeat: "",
  });

  const [createdAccount, setCreatedAccount] = useState<boolean>(false);

  const backHandler = () => {
    setPasswordForm(false);
  };

  const loginPageHandler = () => {
    setLoginForm(!loginForm);
    setCreatedAccount(false);
  };

  const registerHandler = async () => {
    if (passwordData.password === "") {
      setInputDataError("Fields are empty");
      return;
    }

    if (passwordData.password === passwordData.repeat) {
      setInputDataError("");
      setWaitingForData(true);
      const dataToSend: DataToSend = {
        ...data,
        password: passwordData.password,
      };

      const result = await axios.post(
        `${settings.address}/register`,
        dataToSend
      );
      setWaitingForData(false);
      if (result.data === "added") {
        setCreatedAccount(true);
      }
    } else {
      setInputDataError("Passwords doesn't match");
    }
  };

  return (
    <Column>
      <Row onClick={backHandler}>
        <BackButton>
          <Icon icon={faLongArrowLeft} />
          <h2>Go back</h2>
        </BackButton>
      </Row>
      <Row>
        <PasswordFormInput
          fieldName="password"
          value={passwordData.password}
          setData={setPasswordData}
          data={passwordData}
        />

        <PasswordFormInput
          fieldName="repeat"
          value={passwordData.repeat}
          setData={setPasswordData}
          data={passwordData}
        />
      </Row>
      <Row>
        <ButtonStyle onClick={registerHandler}>Register</ButtonStyle>
      </Row>
      {createdAccount ? (
        <CreatedAccountDiv>
          <CommunicateDiv>
            <CommunicateHeader>
              Thanks for join to our community
            </CommunicateHeader>
            <ButtonStyleCreatedAccount onClick={loginPageHandler}>
              Login page
            </ButtonStyleCreatedAccount>
          </CommunicateDiv>
        </CreatedAccountDiv>
      ) : (
        ""
      )}
    </Column>
  );
};

const CommunicateHeader = styled.h1`
  color: #fff2f2;
  text-align: center;
`;

const CommunicateDiv = styled.div`
  width: 60%;
  height: 50%;
  background-color: #7286d3;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const CreatedAccountDiv = styled.div`
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

const ButtonStyleCreatedAccount = styled.button`
  background-color: #fff2f2;
  width: 8rem;
  height: 3rem;
  border-radius: 20px;
  border-color: #fff2f2;
  color: #8ea7e9;
  font-size: 1rem;

  :hover {
    cursor: pointer;
  }
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

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`;

const BackButton = styled.div`
  display: flex;
  border: 2px solid #7286d3;
  border-radius: 20px;
  :hover {
    cursor: pointer;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 3rem;
  color: #7286d3;
  padding-right: 1rem;
`;

interface PasswordForm {
  setPasswordForm: React.Dispatch<React.SetStateAction<boolean>>;
  setInputDataError: React.Dispatch<React.SetStateAction<string>>;
  setWaitingForData: React.Dispatch<React.SetStateAction<boolean>>;
  data: FormData;
  setLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
  loginForm: boolean;
}

interface FormData {
  name: string;
  surname: string;
  nick: string;
  email: string;
  phone: string;
}

interface DataToSend {
  name: string;
  surname: string;
  nick: string;
  email: string;
  phone: string;
  password: string;
}

interface PasswordData {
  password: string;
  repeat: string;
}

export default PasswordForm;
