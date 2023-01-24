//Login/Register Site
import { useState } from "react";
import styled from "styled-components";

//Components
import LoginForm from "../components/loginSiteComponents/LoginForm";
import RegisterForm from "../components/loginSiteComponents/RegisterForm";

const LoginSite = () => {
  const [loginForm, setLoginForm] = useState(false);

  const buttonClickHandler = () => {
    setLoginForm(!loginForm);
  };

  return (
    <div style={{ height: "92%" }}>
      {loginForm ? (
        <LoginSiteStyle>
          <LoginForm />
          <InfoPanel>
            <h3>Dont have account? Create in few moments</h3>
            <ChangePanelButton onClick={buttonClickHandler}>
              Register page
            </ChangePanelButton>
          </InfoPanel>
        </LoginSiteStyle>
      ) : (
        <LoginSiteStyle>
          <RegisterForm />
          <InfoPanel>
            <h3>Did You already create account? Go to login page</h3>
            <ChangePanelButton onClick={buttonClickHandler}>
              Login page
            </ChangePanelButton>
          </InfoPanel>
        </LoginSiteStyle>
      )}
    </div>
  );
};

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
  width: 20rem;
  height: 2.5rem;
`;

export default LoginSite;
