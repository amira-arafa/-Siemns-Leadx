import React, { useState } from "react";
import MicrosoftLogin from "react-microsoft-login";
import { useDispatch } from "react-redux";
import { loginAPi } from "../../store/actions/auth";
import { Row, Col } from "reactstrap";
import loginAsset from "../../assets/imgs/loginAsset.png";
import logo from "../../assets/imgs/ic_Logo.svg";
import loginMicrosoft from "../../assets/imgs/BTN_Sign_in.svg";
import { storeLoginMicrosoftInstance } from "../../store/actions/auth";
import "./Login.scss";
import { FormattedMessage } from "react-intl";

const Login = () => {
  const [msalInstance, onMsalInstanceChange] = useState();
  const dispatch = useDispatch();

  const loginHandler = (err, data, msal) => {
    console.log(err, data);
    if (!err && data) {
      dispatch(storeLoginMicrosoftInstance(msal, data));
      onMsalInstanceChange(msal);
      const loginUserData = {
        email: "mohammed.sobhy@siemens-healthineers.com",
        first_name: "mohammed",
        last_name: "sobhy",
        login_provider_id: "123456787",
        // "email": data?.userPrincipalName,
        // "first_name": data?.givenName,
        // "last_name": data?.surname,
        // "login_provider_id": data?.id
      };
      dispatch(loginAPi(loginUserData));
    }
  };
  return (
    <div className="login-container">
      {!msalInstance ? (
        <div className="login-with-microsoft">
          <Row>
            <Col sm="8" className="p-0">
              <div className="login-data-section">
                <img src={logo} alt="logo" className="mb-4" />
                <h2 className="SH-Bree-Headline headingsColor mb-4">
                  <FormattedMessage id="WelcometoLeadX" />
                </h2>
                <p className="Siemens-Sans headingsColor mb-4">
                  <FormattedMessage id="loginSentance" />
                </p>
                <MicrosoftLogin
                  clientId="fc2e272f-56b5-4466-ad0b-206119970ad5"
                  authCallback={loginHandler}
                  redirectUri="http://localhost:3000"
                  withUserData="true"
                  useLocalStorageCache="true"
                  className="microsoft-login"
                  // clientId={"7c8cbc48-035a-4861-b492-47f8b5e26dd4"}
                  // authCallback={loginHandler}
                  // redirectUri={
                  //   window?.location?.href?.includes("localhost")
                  //     ? "http://localhost:3000/leads"
                  //     : "siemens-leadx.netlify.app/leads"
                  // }
                  // withUserData="true"
                  // useLocalStorageCache="true"
                  // debug="true"
                >
                  <img
                    src={loginMicrosoft}
                    alt="loginMicrosoft"
                    className="cursor-pointer"
                  />
                </MicrosoftLogin>
              </div>
            </Col>
            <Col className="p-0 m-0">
              <div className="login-img-container">
                <img src={loginAsset} alt="login-img" />
              </div>
            </Col>
          </Row>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Login;
