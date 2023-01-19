//Login/Register Site
import { useState } from "react";

//Components
import LoginForm from "../components/loginSiteComponents/LoginForm";
import RegisterForm from "../components/loginSiteComponents/RegisterForm";

const LoginSite = () => {
  const [loginForm, setLoginForm] = useState(true);

  const buttonClickHandler = () => {
    setLoginForm(!loginForm);
  };

  return (
    <div>
      {loginForm ? (
        <>
          <LoginForm />
          <h1>Dont have account? Create in few moments</h1>
          <button onClick={buttonClickHandler}>Register page</button>
        </>
      ) : (
        <>
          <RegisterForm />
          <h1>Did You already create account? Go to login page</h1>
          <button onClick={buttonClickHandler}>Login page</button>
        </>
      )}
    </div>
  );
};

export default LoginSite;
