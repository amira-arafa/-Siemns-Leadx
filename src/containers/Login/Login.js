import React, { useEffect, useState } from "react";
import MicrosoftLogin from "react-microsoft-login";
import { useDispatch, useSelector } from "react-redux";
import { UserAgentApplication } from 'msal';
import { config } from './Config';
import { loginAPi } from "../../store/actions/auth";
import { Row, Col } from "reactstrap";
import loginAsset from "../../assets/imgs/loginAsset.png";
import logo from "../../assets/imgs/ic_Logo.svg";
import loginMicrosoft from "../../assets/imgs/BTN_Sign_in.svg";
import {
  storeLoginMicrosoftInstance,
  storeLoginApiData,
} from "../../store/actions/auth";
import "./Login.scss";
import { FormattedMessage } from "react-intl";

const Login = () => {
  const [msalInstance, onMsalInstanceChange] = useState();
  const [ authenticated , setIsAuth] = useState(false)
  const { Auth } = useSelector(state => state);
  const dispatch = useDispatch();


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

  console.log("UserAgentApplication",userAgentApplication)

const  login = async () => {
    try {
      await userAgentApplication.loginPopup(
        {
          scopes: config.scopes,
          prompt: "select_account"
        });

      // const user = await getUserProfile(this.userAgentApplication, config.scopes);
      setIsAuth(true)
      console.log("suhdsid",userAgentApplication)
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
    //   let firstName = fullName.split(' ').slice(0, -1).join(' ');
    //  let lastName = fullName.split(' ').slice(-1).join(' ');
    }
    catch (err) {
     setIsAuth(false)
    }
  }

 const logout = () => {
    userAgentApplication.logout();
  }


  useEffect(() => {
    if (window?.history?.state?.state?.from==="logout" && msalInstance) {
      dispatch(storeLoginApiData(false));
      dispatch(storeLoginMicrosoftInstance(false, false));
      msalInstance.logout();
    }
  }, [msalInstance , dispatch]);

  const loginHandler = (err, data, msal) => {
    if (!err && data) {
      dispatch(storeLoginMicrosoftInstance(msal, data));
      localStorage.setItem("loginMicrosoftMsal", JSON.stringify(msal));
      localStorage.setItem("microsoftLoginData", JSON.stringify(data));
      onMsalInstanceChange(msal);
      const loginUserData = {
        email: data?.userPrincipalName,
        first_name: data?.givenName,
        last_name: data?.surname || "-",
        login_provider_id: data?.id || "-"
      };

    }
  };
    return (
      <div className="login-container">
        {(!msalInstance || ! localStorage.getItem("token")) ? (
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
                  {/* <MicrosoftLogin
                    clientId="fc2e272f-56b5-4466-ad0b-206119970ad5"
                    authCallback={loginHandler}
                    redirectUri={
                      window?.location?.href?.includes("localhost")
                        ? "http://localhost:3000"
                        : "https://siemens-leadx.netlify.app"
                    }
                    withUserData="true"
                    useLocalStorageCache="true"
                    className={Auth?.logoutSpinner? 'd-none' :`microsoft-login`}
                  > */}
                 
                    <img
                      src={loginMicrosoft}
                      alt="loginMicrosoft"
                      className="cursor-pointer"
                      onClick={() => login()}
                    />
                  {/* </MicrosoftLogin> */}
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
