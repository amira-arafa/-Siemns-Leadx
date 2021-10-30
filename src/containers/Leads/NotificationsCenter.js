import React, { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import { FormattedMessage } from "react-intl";
import NotificationPopUp from "../../../src/containers/Header/NotificationPopUp";
import PaginationComponent from "../../components/Button/PaginationComponent";
import { getNotificationList } from "../../store/actions/auth";
import History from "../../routes/History";
import { useSelector, useDispatch } from "react-redux";
import "./NoticationsCenter.scss";

const NotificationsCenter = () => {
  const { Auth, locale } = useSelector((state) => state);
  const { lang } = locale;
  const dispatch = useDispatch();
  const [activePage, setActivePage] = useState(1);
  const { notificationsList } = Auth;

  useEffect(() => {
    dispatch(getNotificationList({ page: activePage, page_size: 10 }));
  }, [lang, dispatch, activePage]);

  const handlePageChange = (e) => {
    setActivePage(e);
    dispatch(
      getNotificationList({
        page_number: e,
        page_size: 10,
      })
    );
  };
  return (
    <div className="notifications-list-container">
      <Row>
        <Col className="px-0">
          <span
            className="font-size-13 greyColor Siemens-Sans cursor-pointer breadCrumpIcon"
            onClick={() => History.push("/leads")}
          >
            <FormattedMessage id="home" />
          </span>
          <span className="headingColor Siemens-Sans font-size-13">
            <FormattedMessage id="Notifications" />
          </span>
        </Col>
      </Row>
      <Row>
        <NotificationPopUp
          className={"notification-center"}
          notificationsList={notificationsList}
        />
      </Row>
      <div className="my-5">
        {notificationsList?.meta?.total > 10 && (
          <PaginationComponent
            activePage={activePage}
            itemsCountPerPage={10}
            totalItemsCount={notificationsList?.meta?.total}
            pageRangeDisplayed={notificationsList?.meta?.totalPages}
            handlePageChange={(e) => handlePageChange(e)}
          />
        )}
      </div>
    </div>
  );
};

export default NotificationsCenter;
