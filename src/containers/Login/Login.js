import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { UserAgentApplication } from 'msal';
import { config } from './Config';
import { loginAPi } from "../../store/actions/auth";
import { Row, Col } from "reactstrap";
import loginAsset from "../../assets/imgs/loginAsset.png";
import logo from "../../assets/imgs/ic_Logo.svg";
import loginMicrosoft from "../../assets/imgs/BTN_Sign_in.svg";
import "./Login.scss";
import { FormattedMessage } from "react-intl";

const Login = () => {
  const dispatch = useDispatch();
  useEffect(()=> {
    dispatch({
      type : "CLEAR_LOGINData",
      payload : false
    })
  },[dispatch])


const   userAgentApplication = new UserAgentApplication({
    auth: {
      clientId: config.clientId,
      redirectUri: config.redirectUri,
      postLogoutRedirectUri : config.postLogoutRedirectUri,
      withUserData : true
    },
    cache: {
      cacheLocation: "localStorage",
      temporaryCache: "localStorage",
      storeAuthStateInCookie: true
    }
  });

const  login = async () => {
    try {
      await userAgentApplication.loginPopup(
        {
          scopes: config.scopes,
          prompt: "select_account"
        });

      const identifier = userAgentApplication?.account?.accountIdentifier.split("-");
      const loginUserData = {
        email: userAgentApplication?.account?.userName,
        first_name: userAgentApplication?.account?.idToken?.name.split(' ').slice(0, -1).join(' ') || "-",
        last_name: userAgentApplication?.account?.idToken?.name.split(' ').slice(-1).join(' ') || "-",
        login_provider_id: identifier[3] + identifier[4] || "-"
      };
      localStorage.setItem("loginMicrosoftMsal", JSON.stringify(userAgentApplication));
      localStorage.setItem("microsoftLoginData", JSON.stringify(userAgentApplication));
      dispatch(loginAPi(loginUserData));
    }
    catch (err) {
     console.log(err)
    }
  }

    return (
      <div className="login-container">
        {( !localStorage.getItem("token")) ? (
          <div className="login-with-microsoft">
            <Row>
              <Col lg="8" md="8" sm="12" className="p-0">
                <div className="login-data-section">
                  <img src={logo} alt="logo" className="mb-4" />
                  <h2 className="SH-Bree-Headline headingsColor mb-4">
                    <FormattedMessage id="WelcometoLeadX" />
                  </h2>
                  <p className="Siemens-Sans headingsColor mb-4">
                    <FormattedMessage id="loginSentance" />
                  </p>
                    <img
                      src={loginMicrosoft}
                      alt="loginMicrosoft"
                      className="cursor-pointer"
                      onClick={() => login()}
                    />
                </div>
              </Col>
              <Col className="p-0 m-0 login-dark-img">
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
