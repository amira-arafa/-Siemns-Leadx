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
  }, [dispatch, lang, id]);
  const renderActiveStep = () => {
    switch (leadListDetails?.lead_status_id) {
      case 1:
        return 0;
      case 2 :
        return 1;
      case 3 :
        return 2;
      case 4:
        return 3;
      case 6 :
        return 4;
      case 7:
        return 5;
    }
  };
  if(leadListDetails) {
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
            <span className="headingColor Siemens-Sans font-size-13">
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
        {leadListDetails?.lead_status && <Row className="status-container pb-3 card-box-shadow">
          <Col className="stepper-container">
             {leadListDetails?.lead_status === "Rejected" || leadListDetails?.lead_status === "مرفوضة" ?<div className="pt-3">
          <p
            style={{color : '#d9001d' }}
            className={`${
              lang === "ar" ? "text-right" : "text-left"
            } Siemens-Sans-bold greyColor font-size-13 mb-0`}
          >
            <span  style={{backgroundColor: '#f9bfc7'}} className=" px-2 py-1">
            <FormattedMessage id="Rejected"/>
            </span>
          </p>
          <p className="Siemens-Sans headingColor pt-3"> {leadListDetails?.lead_status_note || "-"}</p>
          </div> 
            : <Stepper
              steps={[
                { title: <FormattedMessage id="New" /> },
                { title: <FormattedMessage id="VerifiedbyDCE" /> },
                { title: <FormattedMessage id="Confirmed" /> },
                { title: <FormattedMessage id="Approved" /> },
                { title: <FormattedMessage id="Promoted" /> },
                { title: <FormattedMessage id="OrderBooked" /> },
              ]}
              activeStep={renderActiveStep()}
              size={45}
              completeBarColor={"#e6e6e6"}
              defaultBarColor={"#e6e6e6"}
              activeColor={"#ec6602"}
              completeColor={"#e6e6e6"}
              completeTitleColor={"#666666"}
              circleFontColor={"#fff"}
            /> }
          </Col>
        </Row>}
  
        <Row>
          <Col className="px-0">
            <h2 className="headingColor font-size-19 Siemens-Sans-black my-4 py-1">
              <FormattedMessage id="Information" />
            </h2>
            <div className="card">
              <div className="card-body card-box-shadow py-4">
                <div>
                  <p className="label"> <FormattedMessage id="LeadName" /> </p>
                  <p className="lead-data">{leadListDetails?.lead_name}</p>
                  <hr />
                </div>
                <div>
                  <p className="label"> <FormattedMessage id="LeadDate"/> </p>
                  <p className="lead-data">
                    {moment.unix(leadListDetails?.created_on).format(
                      "DD MMM YYYY, h:mm a"
                    )}
                  </p>
                  <hr />
                </div>
                <div>
                  <p className="label"> <FormattedMessage id="HospitalName"/> </p>
                  <p className="lead-data">{leadListDetails?.hospital_name}</p>
                  <hr />
                </div>
                <div>
                  <p className="label"> <FormattedMessage id="HospitalRegion"/> </p>
                  <p className="lead-data">{leadListDetails?.region}</p>
                  <hr />
                </div>
                <div>
                  <p className="label"> <FormattedMessage id="ContactPerson"/> </p>
                  <p className="lead-data">{leadListDetails?.contact_person}</p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
  
        <Row>
          <Col className="px-0">
            <h2 className="headingColor font-size-19 Siemens-Sans-black my-4 py-1">
              <FormattedMessage id="Details"/>
            </h2>
            <div className="card">
              <div className="card-body card-box-shadow py-4">
                <div>
                  <p className="label"> <FormattedMessage id="BusinessOpportunitytype"/></p>
                  <p className="lead-data">
                    {leadListDetails?.business_opportunity_type}
                  </p>
                  <hr />
                </div>
                <div>
                  <p className="label"> <FormattedMessage id="CustomerStatus"/> </p>
                  <p className="lead-data">{leadListDetails?.customer_status}</p>
                  <hr />
                </div>
                <div>
                  <p className="label"> <FormattedMessage id="dateNeedSystem"/> </p>
                  <p className="lead-data">
                    {moment.unix(leadListDetails?.customer_due_date).format(
                      "DD MMM YYYY, h:mm a"
                    )}
                  </p>
                  <hr />
                </div>
                <div>
                  <p className="label"> <FormattedMessage id="Note"/> </p>
                  <p className="lead-data">{leadListDetails?.comment || "-"}</p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
  
        <Row className="mb-5">
          <Col className="px-0">
            <h2 className="headingColor font-size-19 Siemens-Sans-black my-4 py-1">
              <FormattedMessage id="Device"/>
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
  } else {
    return <div></div>
  }
};

export default LeadsDetails;
