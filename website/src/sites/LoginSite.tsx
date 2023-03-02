//Login/Register Site
import { useState } from "react";
import styled from "styled-components";

//Components
import LoginForm from "../components/loginSiteComponents/LoginForm";
import RegisterForm from "../components/loginSiteComponents/RegisterForm";

const LoginSite = () => {
  const [loginForm, setLoginForm] = useState(true);

  const buttonClickHandler = () => {
    setLoginForm(!loginForm);
  };

  return (
    <div style={{ height: "92vh" }}>
      {loginForm ? (
        <LoginSiteStyle>
          <LoginForm />
          <InfoPanel>
            <SmallText>Dont have account? Create in few moments</SmallText>
            <ChangePanelButton onClick={buttonClickHandler}>
              Register page
            </ChangePanelButton>
          </InfoPanel>
        </LoginSiteStyle>
      ) : (
        <LoginSiteStyle>
          <RegisterForm setLoginForm={setLoginForm} loginForm={loginForm} />
          <InfoPanel>
            <SmallText>
              Did You already create account? Go to login page
            </SmallText>
            <ChangePanelButton onClick={buttonClickHandler}>
              Login page
            </ChangePanelButton>
          </InfoPanel>
        </LoginSiteStyle>
      )}
    </div>
  );
};

const SmallText = styled.h3`
  text-align: center;
`;

const LoginSiteStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const InfoPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 20%;
`;

const ChangePanelButton = styled.button`
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

export default LoginSite;
