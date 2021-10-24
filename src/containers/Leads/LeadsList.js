import React from "react";
import emptyLeadsIcon from "../../assets/imgs/ic_no_data_Circle.svg";
import createLeadBtn from "../../assets/imgs/Card.png";
import "./LeadsList.scss";
import { FormattedMessage } from "react-intl";

const LeadsList = () => {
  return (
    <div className="lead-list-container">
      <div className="empty-state">
        <img src={emptyLeadsIcon} alt={"no-leads"} />
        <p className="Siemens-Sans-black headingLeadsColor font-size-19 mt-2 mb-4">
          <FormattedMessage id="noLeadsYet" />
        </p>
        <p className="Siemens-Sans headingLeadsColor font-size-17">
          {" "}
          <FormattedMessage id="emptyLeads" />
          <br />
          <FormattedMessage id="emptyLeads2" />
        </p>
        <img src={createLeadBtn} alt={"no-leads"} />
      </div>
    </div>
  );
};

export default LeadsList;
