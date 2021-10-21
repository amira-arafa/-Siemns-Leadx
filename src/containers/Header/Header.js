import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../components/Button/Button";
import { setCurrentLang } from "../../store/actions/Lang";

const Header = () => {
  const { lang } = useSelector((state)=> state.locale );
  const dispatch = useDispatch();
  const switchLang = (lang) => {
    dispatch(setCurrentLang(lang === "en" ? "ar" : "en"));
  };

  return (
    <div>
      <Button onClick={() => switchLang(lang)} />
    </div>
  );
};
export default Header;
