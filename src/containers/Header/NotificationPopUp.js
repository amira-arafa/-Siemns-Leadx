import React from "react";
import { FormattedMessage } from "react-intl";
import notificationIcon from "../../assets/imgs/ic_Notification_Circle.png";
import moment from "moment-timezone";
import rewardIcon from "../../assets/imgs/ic_Reward_Circle.png";
import { Row, Col } from "reactstrap";
import "./NotificationPopUp.scss";
import History from "../../routes/History";

const NotificationPopUpEmpty = ({ notificationsList, seeMore , className }) => {
  return (
    <div className={`notification-popup-container ${className}`}>
      {notificationsList?.data?.map((notification, i) => {
        return (
          <div key={i}>
            <Row>
              <Col sm="2">
                <img src={notificationIcon} alt="active-notification-icon" />
              </Col>
              <Col sm={seeMore ? 6 : 8}>
                <p className="mb-0  date-message-font Siemens-Sans-bold font-size-14">
                  <FormattedMessage id="leadID" /> {notification.lead_id}{" "}
                </p>
                <p className="mb-0  date-notification-font Siemens-Sans font-size-14">
                  {notification.message}
                </p>
              </Col>
              <Col sm={seeMore ? 4 : 2} className="date-notification-font font-size-12">
                {moment(notification.sent_on).format("DD MMM, h:mm a")}
              </Col>
            </Row>
            {i < notificationsList?.data?.length - 1 && <div className="hr"></div>}
          </div>
        );
      })}
      {seeMore &&  <Row>
        <Col>
          <a className=" date-notification-font Siemens-Sans font-size-14 cursor-pointer see-more-color" onClick={()=>{History.push('/notifications')}}>
            <FormattedMessage id="seeMore" />
          </a>
        </Col>
      </Row>}
    </div>
  );
};
export default NotificationPopUpEmpty;
