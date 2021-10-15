import React, { useState } from "react";
import MicrosoftLogin from "react-microsoft-login";
import { useDispatch } from "react-redux";
import { loginAPi } from "../../store/actions/auth"
import "./Login.scss";

const Login = () => {
  const [msalInstance, onMsalInstanceChange] = useState();
  const dispatch = useDispatch(); 

  const loginHandler = (err, data, msal) => {
    console.log(err, data);
    if (!err && data) {
      onMsalInstanceChange(msal);
      const loginUserData = {
          "email": "mohammed.sobhy@siemens-healthineers.com",
          "first_name": "mohammed",
          "last_name": "sobhy",
          "login_provider_id": "123456787"
        // "email": data?.userPrincipalName,
        // "first_name": data?.givenName,
        // "last_name": data?.surname,
        // "login_provider_id": data?.id
      }
      dispatch(loginAPi(loginUserData));
    }
  };
  const logoutHandler = () => {
    msalInstance.logout();
  };

  return (
    <div className="login-container">
      {msalInstance ? (
        <button onClick={logoutHandler}>Logout</button>
      ) : (
        <div className="login-with-microsoft">
          <MicrosoftLogin
            className="microsoft-login"
            clientId={"7c8cbc48-035a-4861-b492-47f8b5e26dd4"}
            authCallback={loginHandler}
            redirectUri={"https://agitated-austin-23558c.netlify.app"}
            withUserData="true"
            useLocalStorageCache={true}
          />
        </div>
      )}
    </div>
  );
};

export default Login;