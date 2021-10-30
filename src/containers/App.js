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
import { requestFirebaseNotificationPermission, onMessageListener } from "../firebaseInit";
import "./App.scss";

const App = () => {
  const { locale } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { lang } = locale;

  useEffect(() => {
    requestFirebaseNotificationPermission()
      .then((firebaseToken) => {
        localStorage.setItem("firebaseToken",firebaseToken)
         localStorage.getItem("token") && dispatch(storeFCMtocken({
          model : `${deviceDetect().browserName}${localStorage.getItem("token")}`,
          token :  localStorage.getItem("firebaseToken")
        }))
      })
      .catch((err) => {
        return err;
      });
  }, [dispatch, lang]);
  onMessageListener()
  .then(payload => {
    const { body, title } = payload.notification;
    toast(<div>
      <p>{title}</p>
      <p>{body}</p>
    </div>)
  })
  .catch(err => {
    console.log(err);
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
