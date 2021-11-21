import React from "react";
import { Row, Col } from "reactstrap";
import chatIcon from "../../assets/imgs/ic_Chat_Circle.svg";
import emailIcon from "../../assets/imgs/ic_Email_Circle.svg";
import customerServiceIcon from "../../assets/imgs/ic_Support_Circle.svg";
import { FormattedMessage } from "react-intl";
import "./LeadsDetails.scss";


const ContactUs = () => {


    return (
      <div className="leads-details-container">
        <Row>
          <Col className="px-0">
            <h2 className="headingColor font-size-19 SH-Bree-Headline mb-4 py-1">
              <FormattedMessage id="contactUS" />
            </h2>
            <div className="card">
              <div className="card-body card-box-shadow py-4 contact-us-section">
                {/* <div>
                  <Row>
                      <Col  sm="1" className="contact-us-logos">
                      <img src={chatIcon} alt="chat-icon"/>
                      </Col>
                      <Col className="mx-3">
                      <p className="mb-0 headingColor Siemens-Sans-bold pt-1"> <FormattedMessage id="chatWithUs"/></p>
                      <p className="font-size-14 Siemens-Sans">  <FormattedMessage id="chatHere"/></p>
                      </Col>
                  </Row>
                  <hr className="mb-2"/>
                </div> */}
                <div>
                  <Row>
                      <Col sm="1" className="contact-us-logos">
                      <img src={emailIcon} alt="email-icon"/>
                      </Col>
                      <Col className="mx-3">
                      <p className="mb-0 headingColor Siemens-Sans-bold pt-1"> <FormattedMessage id="sendEmail"/></p>
                      <p className="font-size-14 Siemens-Sans">  <FormattedMessage id="sendQorProblem"/></p>
                      </Col>
                  </Row>
                  <hr className="mb-2"/>
                </div>
                <div>
                  <Row>
                      <Col  sm="1" className="contact-us-logos">
                      <img src={customerServiceIcon} alt="customer-service-icon"/>
                      </Col>
                      <Col className="mx-3">
                      <p className="mb-0 headingColor Siemens-Sans-bold pt-1"> <FormattedMessage id="customerService"/></p>
                      <p className="font-size-14 Siemens-Sans"> 977364287</p>
                      </Col>
                  </Row>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
};

export default ContactUs;
