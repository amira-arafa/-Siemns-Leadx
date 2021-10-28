import React, { useEffect } from "react";
import { Row, Col } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import history from "../../routes/History";
import { useParams } from "react-router";
import Stepper from "react-stepper-horizontal";
import { FormattedMessage } from "react-intl";
import moment from "moment-timezone";
import { getLeadDetails } from "../../store/actions/leads";
import "./LeadsDetails.scss";

const LeadsDetails = () => {
  const { locale, leads } = useSelector((state) => state);
  const { lang } = locale;
  const { leadListDetails } = leads;
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLeadDetails(id));
  }, [dispatch, lang , id]);
  return (
    <div className="leads-details-container">
      <Row>
        <Col className="px-0">
          <span
            className="font-size-13 greyColor Siemens-Sans cursor-pointer breadCrumpIcon"
            onClick={() => history.push("/leads")}
          >
            <FormattedMessage id="home" />
          </span>
          <span className="headingColor Siemens-Sans font-size-13  ">
            <FormattedMessage id="leadDetails" />
          </span>
        </Col>
      </Row>
      <Row>
        <Col className="px-0">
          <p className="SH-Bree-Headline font-size-23 my-4">
            <FormattedMessage id="leadID" /> {id}
          </p>
        </Col>
      </Row>
      <Row className="status-container pb-3 card-box-shadow">
        <Col className="stepper-container">
          <Stepper
            steps={[
              { title: "Verified" },
              { title: "Confirmed" },
              { title: "Approved" },
              { title: "Promoted" },
              { title: "Booked" },
            ]}
            activeStep={1}
            size={45}
            completeBarColor={"#e6e6e6"}
            defaultBarColor={"#e6e6e6"}
            activeColor={"#ec6602"}
            completeColor={"#e6e6e6"}
            completeTitleColor={"#666666"}
            circleFontColor={"#fff"}
          />
        </Col>
      </Row>

      <Row>
        <Col className="px-0">
          <h2 className="headingColor font-size-19 Siemens-Sans-black my-4 py-1">
            <FormattedMessage id="Information" />
          </h2>
          <div className="card">
            <div className="card-body card-box-shadow py-4">
              <div>
                <p className="label">Lead Name </p>
                <p className="lead-data">{leadListDetails?.lead_name}</p>
                <hr />
              </div>
              <div>
                <p className="label">Lead Date </p>
                <p className="lead-data">
                  {moment(leadListDetails?.created_on).format(
                    "DD MMM YYYY, h:mm a"
                  )}
                </p>
                <hr />
              </div>
              <div>
                <p className="label">Hospital Name </p>
                <p className="lead-data">{leadListDetails?.hospital_name}</p>
                <hr />
              </div>
              <div>
                <p className="label">Hospital Region </p>
                <p className="lead-data">{leadListDetails?.region}</p>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col className="px-0">
          <h2 className="headingColor font-size-19 Siemens-Sans-black my-4 py-1">
            Details
          </h2>
          <div className="card">
            <div className="card-body card-box-shadow py-4">
              <div>
                <p className="label">Business opportunity Type </p>
                <p className="lead-data">
                  {leadListDetails?.business_opportunity_type}
                </p>
                <hr />
              </div>
              <div>
                <p className="label">Customer Status </p>
                <p className="lead-data">{leadListDetails?.customer_status}</p>
                <hr />
              </div>
              <div>
                <p className="label">Date Need System </p>
                <p className="lead-data">
                  {moment(leadListDetails?.customer_due_date).format(
                    "DD MMM YYYY, h:mm a"
                  )}
                </p>
                <hr />
              </div>
              <div>
                <p className="label">Note </p>
                <p className="lead-data">{leadListDetails?.comment || "-"}</p>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col className="px-0">
          <h2 className="headingColor font-size-19 Siemens-Sans-black my-4 py-1">
            Device
          </h2>
          <div className="card">
            <div className="card-body card-box-shadow py-4">
              {leadListDetails?.devices?.map((device, i) => {
                return (
                  <div key={i}>
                    <p className="label">Device / Need {i + 1} </p>
                    <p className="lead-data">{device}</p>
                    {leadListDetails.devices.length > i + 1 && <hr />}
                  </div>
                );
              })}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default LeadsDetails;
