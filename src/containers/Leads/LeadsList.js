import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import emptyLeadsIcon from "../../assets/imgs/ic_no_data_Circle.svg";
import plus from "../../assets/imgs/plus (1).svg";
import { getLeadsList } from "../../store/actions/leads";
import { FormattedMessage } from "react-intl";
import LeadCard from "./LeadCard";
import { Button } from "reactstrap";
import history from "../../routes/History";
import PaginationComponent from "../../components/Button/PaginationComponent";
import "./LeadsList.scss";

const LeadsList = () => {
  const { leads, locale } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [activePage, setActivepage] = useState(1);
  useEffect(() => {
    dispatch(
      getLeadsList({
        page_number: activePage,
        page_size: 10,
      })
    );
  }, [dispatch, locale.lang]);
  const handlePageChange = (e) => {
    setActivepage(e);
    dispatch(
      getLeadsList({
        page_number: e,
        page_size: 10,
      })
    );
  };

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
          <Button color="none">
            <img src={plus} alt="plus-icon" />
            <span className="mx-2">
              {" "}
              <FormattedMessage id="CreateNewLead" />{" "}
            </span>
          </Button>
        </div>
      ) : (
        <div className="lead-cards">
          <div
            className={`${
              locale.lang === "ar" ? "text-left" : "text-right"
            } my-5`}
          >
            <Button color="none">
              <img src={plus} alt="plus-icon" />
              <span className="mx-2">
                {" "}
                <FormattedMessage id="CreateNewLead" />{" "}
              </span>
            </Button>
          </div>
          {leads?.leadsList?.data?.map((item) => {
            return (
              <div
                key={item.lead_id}
                className="cursor-pointer"
                onClick={() => history.push(`/leads/details/${item.lead_id}`)}
              >
                <LeadCard
                  lang={locale.lang}
                  id={item.lead_id}
                  createdAt={item.created_on}
                  leadName={item.lead_name}
                  hospitalName={item.hospital_name}
                  textColor={item.lead_status_text_color}
                  backgroundColor={item.lead_status_back_color}
                  status={item.lead_status}
                />
              </div>
            );
          })}
          <div className="my-5">
            {leads.leadsList?.meta?.total > 10 && (
              <PaginationComponent
                activePage={activePage}
                itemsCountPerPage={10}
                totalItemsCount={leads.leadsList?.meta?.total}
                pageRangeDisplayed={leads.leadsList?.meta?.totalPages}
                handlePageChange={(e) => handlePageChange(e)}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadsList;
