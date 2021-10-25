import React from "react";
import { Row, Col } from "reactstrap";
import moment from "moment-timezone";
import "./LeadCard.scss";
import { FormattedMessage } from "react-intl";

const LeadCard = ({
  lang,
  id,
  createdAt,
  leadName,
  hospitalName,
  textColor,
  backgroundColor,
  status,
}) => {
  return (
    <div className="lead-card-container">
      <Row className="no-gutters">
        <Col>
          <p className="leadIdColor Siemens-Sans-black mb-2">{id}</p>
        </Col>
        <Col>
          <p
            className={`${
              lang === "ar" ? "text-left" : "text-right"
            } Siemens-Sans-bold greyColor font-size-13`}
          >
            {moment(createdAt).format("DD MMM YYYY, h:mm a")}
          </p>
        </Col>
      </Row>
      <Row className="no-gutters">
        <Col>
          <p className="headingColor font-size-18 Siemens-Sans-black mb-1">
            {leadName}
          </p>
        </Col>
      </Row>
      <Row className="no-gutters">
        <Col>
          <p className="greyColor Siemens-Sans-bold Siemens-Sans-black mb-0">
            {hospitalName}
          </p>
        </Col>
      </Row>
      <div className="hr"></div>
      <Row className="no-gutters">
        <Col>
          <p className="leadIdColor font-size-13 Siemens-Sans-bold mb-0">
            <FormattedMessage id="leadStatus" />
          </p>
        </Col>
        <Col>
          <p
            style={{color : textColor}}
            className={`${
              lang === "ar" ? "text-left" : "text-right"
            } Siemens-Sans-bold greyColor font-size-13 mb-0`}
          >
            <span  style={{backgroundColor: backgroundColor}}>
            {status}
            </span>
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default LeadCard;
