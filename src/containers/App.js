import React, { useEffect } from "react";
import { Router } from "react-router-dom";
import { useSelector } from "react-redux";
import history from "../routes/History";
import Routes from "../routes/Routes";
import { IntlProvider } from "react-intl";
import messages from "../assets/Local/messages";
import { requestFirebaseNotificationPermission } from '../firebaseInit';
import "./App.scss";

const App = () => {
  const { locale } = useSelector((state) => state);
  const { lang } = locale;

  useEffect(() => {
    requestFirebaseNotificationPermission()
    .then((firebaseToken) => {
      console.log(firebaseToken);
    })
    .catch((err) => {
      return err;
    });
  }, []);

  return (
    <IntlProvider locale={lang} messages={messages[lang]}>
      <div
        className={lang === "ar" ? "rtl" : "ltr"}
        dir={lang === "ar" ? "rtl" : "ltr"}
      >
        <Router history={history}>{Routes}</Router>
      </div>
    </IntlProvider>
  );
};

export default App;
