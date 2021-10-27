import React from "react" ;
import { FormattedMessage } from "react-intl";
import notificationIcon from "../../assets/imgs/ic_Notification_Circle.svg";
import "./NotificationPopUp.scss";

const NotificationPopUp = () => {
    return (<div className="notification-popup-container">
         <img src={notificationIcon} alt={"no-leads"} className="mb-3"/>
          <p className="Siemens-Sans-black notificationColor font-size-19 mt-2 mb-4 font-weight-900">
            <FormattedMessage id="EmptyNotification" />
          </p>
          <p className="Siemens-Sans headingLeadsColor font-size-17 mb-4 pb-1 w-75 m-auto">
            <FormattedMessage id="noNotifications" />
          </p>
    </div>)
}
export default NotificationPopUp;