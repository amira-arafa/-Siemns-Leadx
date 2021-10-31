import React, { useEffect, useState , useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import logo from "../../assets/imgs/ic_Logo.svg";
import emailIcon from "../../assets/imgs/ic_contact_us.svg";
import langIcon from "../../assets/imgs/ic_Language.svg";
import { deviceDetect } from "react-device-detect";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import notificationsIcon from "../../assets/imgs/ic_Notification.svg";
import activeNotificationIcon from "../../assets/imgs/ic_Notification_Active.svg";
import { Row, Col } from "reactstrap";
import { setCurrentLang } from "../../store/actions/Lang";
import { changeLogoutSpinnerStatus, clearFCMtoken, getNotificationList } from "../../store/actions/auth";
import { FormattedMessage } from "react-intl";
import  NotificationPopUpEmpty  from "./NotificationPopUpEmpty";
import  NotificationPopUp  from "./NotificationPopUp";
import "./Header.scss";

const Header = () => {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  function useOutsideAlerter(ref) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
              setnotificationOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}
  const handleSeeMore = () => {
    setnotificationOpen(false);
  }
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationOpen, setnotificationOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const [language, setLanguage] = useState(
    localStorage.getItem("lang") === "ar" ? "ar" : "en"
  );
  const dispatch = useDispatch();
  const { Auth } = useSelector((state) => state);
  const { notificationsList } = Auth;
  const handleOpenNotificationList = () => {
    setnotificationOpen(!notificationOpen);
  };
  useEffect(() => {
    dispatch(setCurrentLang(language));
  }, [language, dispatch]);

  useEffect(() => {
    if( (localStorage.getItem("token") &&  localStorage.getItem("microsoftLoginData") &&  localStorage.getItem("loginApiUserData")) ){
      dispatch(getNotificationList({page : 1 , page_size: 10}));
    }
  }, [language, dispatch]);
  return (
    <div className="header-container">
      <Row className="nav-bar no-gutters align-items-center">
        <Col sm="7">
          <Row>
            <Col sm="2">
              <img src={logo} alt="Siemns-logo" />
            </Col>
            <Col>
              <p className="SH-Bree-Headline m-0 headingsColor mx-3">
                <FormattedMessage id="LeadX" />
              </p>
            </Col>
          </Row>
        </Col>
        <Col>
          <div
            className={`d-flex align-items-center ${
              Auth?.microsoftLoginData
                ? "justify-content-end"
                : "justify-content-center"
            }`}
          >
            <div className="px-1">
              <div className="d-flex ">
                <img src={emailIcon} alt="header-icon" />
                <span className="Siemens-Sans greyColor px-1">
                  <FormattedMessage id="contactUS" />
                </span>
              </div>
            </div>
            <div className="px-1">
              <div className="d-flex">
                <img src={langIcon} alt="header-icon" />
                <Select
                  options={[
                    { value: "en", label: "EN" },
                    { value: "ar", label: "AR" },
                  ]}
                  value={
                    language === "ar"
                      ? { value: "ar", label: "AR" }
                      : { value: "en", label: "EN" }
                  }
                  onChange={(e) => {
                    setLanguage(e.value);
                  }}
                ></Select>
              </div>
            </div>
            <div
              className="px-1 cursor-pointer"
              onClick={() => handleOpenNotificationList()}
            >
              <img
                src={
                  notificationOpen ? activeNotificationIcon : notificationsIcon
                }
                alt="header-icon"
              />
            </div>
            {Auth?.microsoftLoginData && localStorage.getItem("token") && (
              <div className="d-flex px-1 align-items-center">
                <div className="Siemens-Sans greyColor header-user-name mx-2 font-weight-900 font-size-12">
                  {Auth?.microsoftLoginData?.givenName?.charAt(0)}
                  {Auth?.microsoftLoginData?.surname?.charAt(0)}
                </div>
                <div className="user-full-name ">
                  <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle
                      className={language === "ar" ? "text-right" : "text-left"}
                    >
                      <p className="Siemens-Sans greyColor font-weight-900 font-size-13 mb-0">
                        {Auth?.microsoftLoginData?.displayName}
                      </p>
                      <p className="Siemens-Sans greyColor font-size-13 mb-0">
                        Siemens Healthineers
                      </p>
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem
                        onClick={() => {
                          dispatch(clearFCMtoken({
                            model : `${deviceDetect().browserName}${localStorage.getItem("token")}`,
                            token :  localStorage.getItem("firebaseToken")
                          }));
                          dispatch(changeLogoutSpinnerStatus(true));
                 
                        }}
                      >
                        <FormattedMessage id="Logout" />
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
            )}
          </div>
        </Col>
      </Row>
     <div  ref={wrapperRef}>
     {notificationOpen && ( notificationsList?.data?.length>0 ? <NotificationPopUp seeMore={true} handleSeeMore={handleSeeMore} className={"full-notification"} notificationsList={notificationsList} /> : <div><NotificationPopUpEmpty /></div>)}
     </div>
    </div>
  );
};
export default Header;
