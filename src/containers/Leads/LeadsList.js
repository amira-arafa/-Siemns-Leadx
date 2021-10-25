import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import emptyLeadsIcon from "../../assets/imgs/ic_no_data_Circle.svg";
import  plus  from "../../assets/imgs/plus (1).svg";
import { getLeadsList } from "../../store/actions/leads";
import { FormattedMessage } from "react-intl";
import LeadCard from "./LeadCard";
import "./LeadsList.scss";
import { Button } from "reactstrap";

const LeadsList = () => {
  const { leads, locale } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLeadsList());
  }, [dispatch]);

  return (
    <div className="lead-list-container">
      {leads.leadsList?.data?.length === 0 ? (
        <div className="empty-state">
          <img src={emptyLeadsIcon} alt={"no-leads"} />
          <p className="Siemens-Sans-black headingLeadsColor font-size-19 mt-2 mb-4">
            <FormattedMessage id="noLeadsYet" />
          </p>
          <p className="Siemens-Sans headingLeadsColor font-size-17 mb-4 pb-1">
            <FormattedMessage id="emptyLeads" />
            <br />
            <FormattedMessage id="emptyLeads2" />
          </p>
          <Button color="none"><img src={plus} alt="plus-icon"/>
          <span  className="mx-2"> <FormattedMessage id="CreateNewLead"/> </span>
          </Button>
        </div>
      ) : (
        <div className="lead-cards">
          <div className={`${locale.lang==="ar" ? "text-left" : "text-right"} my-5`}>
          <Button color="none"><img src={plus} alt="plus-icon"/>
          <span  className="mx-2"> <FormattedMessage id="CreateNewLead"/> </span>
          </Button>
          </div>
          {leads?.leadsList?.data?.map((item)=>{
            return <LeadCard
              key={item.lead_id}
              lang={locale.lang}
              id={item.lead_id}
              createdAt={item.created_on}
              leadName={item.lead_name}
              hospitalName={item.hospital_name}
              textColor={item.lead_status_text_color}
              backgroundColor={item.lead_status_back_color}
              status={item.lead_status}
            />
          })}
        </div>
      )}
    </div>
  );
};

export default LeadsList;
