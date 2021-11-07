import React, { useEffect } from "react";
import { Router } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import history from "../routes/History";
import Routes from "../routes/Routes";
import { IntlProvider } from "react-intl";
import messages from "../assets/Local/messages";
import { ToastContainer , toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deviceDetect } from "react-device-detect";
import { storeFCMtocken } from "../store/actions/auth";
import { requestFirebaseNotificationPermission, test } from "../firebaseInit";
import "./App.scss";

const App = () => {
  const { locale } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { lang } = locale;

  useEffect(() => {
    localStorage.getItem("token") && dispatch(storeFCMtocken({
      model : `${deviceDetect().browserName}${localStorage.getItem("token")}`,
      token :  localStorage.getItem("firebaseToken")
    }))
  }, [dispatch, lang]);


    test.onMessage((payload) => {
      if(  payload._notification) {
        const { body, title } =  payload._notification
        body && title && toast(<div>
          <p>{body}</p>
          <p>{title}</p>
        </div>)

      }
    });   

  requestFirebaseNotificationPermission()
  .then((firebaseToken) => {
    localStorage.setItem("firebaseToken",firebaseToken)
  })
  .catch((err) => {
    return err;
  });

  return (
    <IntlProvider locale={lang} messages={messages[lang]}>
      <div
        className={lang === "ar" ? "rtl" : "ltr"}
        dir={lang === "ar" ? "rtl" : "ltr"}
      >
      <div>
        <ToastContainer position="bottom-left" hideProgressBar={true} autoClose={5000}/>
      </div>

        <Router history={history}>{Routes}</Router>
      </div>
    </IntlProvider>
  );
};

export default App;
