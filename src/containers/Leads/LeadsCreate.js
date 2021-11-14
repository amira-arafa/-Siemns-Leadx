import React, { useEffect, useState } from "react";
import {
  Form,
  FormGroup,
  Input,
  Button,
  FormFeedback,
  Row,
  Col,
} from "reactstrap";
import moment from "moment-timezone";
import plus from "../../assets/imgs/plus (4).svg";
import history from "../../routes/History";
import { FormattedMessage, injectIntl } from "react-intl";
import { listOptions } from "../../utils/commonFunctions";
import { useFormik } from "formik";
import * as Yup from "yup";
import FloatingLabelInput from "react-floating-label-input";
import AppDatePicker from "../../components/Button/AppDatePicker";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import {
  createLeadApi,
  getBuisinessOprtunities,
  getCustomerStatus,
  getRegions,
  getDevices,
  getSectors
} from "../../store/actions/leads";
import "./LeadsCreate.scss";

const LeadsCreate = ({ intl }) => {
  const dispatch = useDispatch();
  const { locale, leads } = useSelector((state) => state);
  const { buisinessOportunityddp, customerStatusDpp, devicesDpp , regionDpp, sectorDpp } = leads;
  const { lang } = locale;
  const [business_opportunity_type, setBuisinessOportunityValue] = useState("");
  const [customerStatus, setCustomerStatus] = useState(undefined);
  const [region, setRegion] = useState(undefined);
  const [sector, setSector] = useState(undefined);
  const [DevicesErr, setDevicesErr] = useState("");
  const [customerStatusErr, setCustomerStatusErr] = useState("");
  const [regionErr, setregionErr] = useState("");
  const [sectorErr, setSectorErr] = useState("");

  
  const [dynamicDevicesLead, setDynamicDevicesLead] = useState([
    {
      id: 1,
      value: "",
    },
  ]);
  const [initialValues] = useState({
    lead_name: "",
    hospital_name: "",
    city: "",
    customer_due_date: "",
    comment: "",
    contact_person: "",
    devices: [],
  });
  useEffect(() => {
    dispatch(getBuisinessOprtunities());
    dispatch(getCustomerStatus());
    dispatch(getDevices());
    dispatch(getRegions());
    dispatch(getSectors())
  }, [dispatch , lang]);

  const yupString = Yup.string();
  const validationSchema = Yup.object({
    lead_name: yupString.required(
      <FormattedMessage id="ThisFieldisRequired" />
    ).max(40, <FormattedMessage id="fieldMax40" />),
    hospital_name: yupString.required(
      <FormattedMessage id="ThisFieldisRequired" />
    ).max(40, <FormattedMessage id="fieldMax40" />),
    city: yupString.required(<FormattedMessage id="ThisFieldisRequired" />).max(40, <FormattedMessage id="fieldMax40" />),
    customer_due_date: yupString.required(
      <FormattedMessage id="ThisFieldisRequired" />
    ),
    contact_person :yupString.required(<FormattedMessage id="ThisFieldisRequired" />).max(40, <FormattedMessage id="fieldMax40" />),
  });
  const onSubmit = (values, actions) => {
    let data = values;
    data.customer_status = customerStatus?.value;
    data.region = region?.value;
    data.sector = sector?.value;
    data.business_opportunity_type = business_opportunity_type.value;
    const devices = dynamicDevicesLead.map((device)=>{
      return device?.value?.value
    })
    const emptyDevices = devices.every((ele)=>ele===undefined);
    data.devices = devices.filter((ele)=>  ele !==null).filter(ele=> ele!==undefined);
    emptyDevices && setDevicesErr(<FormattedMessage id="ThisFieldisRequired" />);
    customerStatus ===undefined && setCustomerStatusErr(<FormattedMessage id="ThisFieldisRequired" />);

    sector ===undefined && setSectorErr(<FormattedMessage id="ThisFieldisRequired" />);
    region ===undefined && setregionErr(<FormattedMessage id="ThisFieldisRequired" />);
    if(!emptyDevices && sector!==undefined  &&  region!==undefined  &&customerStatus!==undefined && data?.lead_name && data?.customer_due_date && data?.customer_due_date){
       dispatch(createLeadApi(data));
    }
  };
  const handleOthers = (values, actions) => {
    let data = values;
    data.customer_status = customerStatus?.value;
    data.sector = sector?.value;
    data.region = region?.value;
    data.business_opportunity_type = business_opportunity_type.value;
    const devices = dynamicDevicesLead.map((device)=>{
      return device?.value?.value
    })
    const emptyDevices = devices.every((ele)=>ele===undefined);
    data.devices = devices.filter((ele)=>  ele !==null).filter(ele=> ele!==undefined);
    emptyDevices && setDevicesErr(<FormattedMessage id="ThisFieldisRequired" />);
    customerStatus ===undefined && setCustomerStatusErr(<FormattedMessage id="ThisFieldisRequired" />);
    sector ===undefined && setSectorErr(<FormattedMessage id="ThisFieldisRequired" />);
    region ===undefined && setregionErr(<FormattedMessage id="ThisFieldisRequired" />);

  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });
  const { messages } = intl;

  const handleDevicesChange = (selectedOption, id) => {
    const findIndex = dynamicDevicesLead.findIndex((item) => item.id === id);
    let foundDynamicDevicesLead = dynamicDevicesLead[findIndex];
    foundDynamicDevicesLead.value = selectedOption;
    const newDevices = dynamicDevicesLead.map((item) => {
      if (item.id === foundDynamicDevicesLead.id) {
        return (item = foundDynamicDevicesLead);
      } else {
        return item;
      }
    });
    setDynamicDevicesLead(newDevices);
  };
  const handleInputChange = ({ target }, name, id) => {
    const { value } = target;
    switch (name) {
      case "DevicesLeads": {
        const findIndex = dynamicDevicesLead.findIndex(
          (item) => item.id === id
        );
        let foundDynamicDevicesLead = dynamicDevicesLead[findIndex];
        foundDynamicDevicesLead.value = value;
        const newDevices = dynamicDevicesLead.map((item) => {
          if (item.id === foundDynamicDevicesLead.id) {
            return (item = foundDynamicDevicesLead);
          } else {
            return item;
          }
        });
        setDynamicDevicesLead(newDevices);
        return null;
      }
      case "hospital_name": {
        value
          ? formik.setFieldValue("hospital_name", value)
          : formik.setFieldValue("hospital_name", "");
        return null;
      }
      case "city": {
        value
          ? formik.setFieldValue("city", value)
          : formik.setFieldValue("city", "");
        return null;
      }
      case "lead_name": {
        value
          ? formik.setFieldValue("lead_name", value)
          : formik.setFieldValue("lead_name", "");
        return null;
      }
      case "contact_person": {
        value
          ? formik.setFieldValue("contact_person", value)
          : formik.setFieldValue("contact_person", "");
        return null;
      }
      case "comment": {
        value
          ? formik.setFieldValue("comment", value)
          : formik.setFieldValue("comment", "");
        return null;
      }
      default:
        return null;
    }
  };
  const handleAddDevice = () => {
    setDynamicDevicesLead([
      ...dynamicDevicesLead,
      { id: dynamicDevicesLead.length + 1, value: "" },
    ]);
  };
  return (
    <div className="create-leads-container">
      <Row>
        <Col className="px-0">
          <span
            className="font-size-13 greyColor Siemens-Sans cursor-pointer breadCrumpIcon"
            onClick={() => history.push("/leads")}
          >
            <FormattedMessage id="home" />
          </span>
          <span className="headingColor Siemens-Sans font-size-13  ">
            <FormattedMessage id="CreateNewLead" />
          </span>
        </Col>
      </Row>
      <Form className=" m-auto " onSubmit={formik.handleSubmit}>
        <Row>
          <Col className="px-0">
            <p className="SH-Bree-Headline font-size-23 my-4">
              <FormattedMessage id="CreateNewLead" />
            </p>
          </Col>
        </Row>
        <FormGroup className="mb-5">
          <FloatingLabelInput
            type="text"
            id="lead_name"
            name="lead_name"
            onChange={(e) => {
              handleInputChange(e, "lead_name");
            }}
            label={messages.LeadName}
          />
          <FormFeedback className="d-block">
            {formik.touched.lead_name && formik.errors.lead_name}
          </FormFeedback>
        </FormGroup>
        {regionDpp?.length>0 &&<Row>
          <Col sm="12" md="6" lg="6" className={lang === "ar" ? "pl-3 pr-0" : "pl-0 pr-3"}>
            <FormGroup className="mb-5 hospitalName">
              <FloatingLabelInput
                id="hospital_name"
                type="text"
                name="hospital_name"
                onChange={(e) => {
                  handleInputChange(e, "hospital_name");
                }}
                label={messages.HospitalName}
              />
              <FormFeedback className="d-block">
                {formik.touched.hospital_name && formik.errors.hospital_name}
              </FormFeedback>
            </FormGroup>
          </Col>
          <Col className="p-0" sm="12" md="6" lg="6" >
           <FormGroup className="mb-5">
              <Select
                classNamePrefix="select"
                id="region"
                placeholder={messages.Region}
                name="region"
                isClearable
                onChange={(selectedOption) => {
                  setregionErr("")
                  if (selectedOption) {
                    setRegion(selectedOption);
                  } else {
                    setRegion("");
                  }
                }}
                options={listOptions(regionDpp)}
              />
              <FormFeedback className="d-block">
                {regionErr}
              </FormFeedback>
              </FormGroup>
          </Col>
        </Row>}
        {sectorDpp?.length>0 &&<Row>
          <Col sm="12" md="6" lg="6" className={lang === "ar" ? "pl-3 pr-0" : "pl-0 pr-3"}>
            <FormGroup className="mb-5 citylName">
              <FloatingLabelInput
                id="city"
                type="text"
                name="city"
                onChange={(e) => {
                  handleInputChange(e, "city");
                }}
                label={messages.city}
              />
              <FormFeedback className="d-block">
                {formik.touched.city && formik.errors.city}
              </FormFeedback>
            </FormGroup>
          </Col>
          <Col className="p-0" sm="12" md="6" lg="6" >
           <FormGroup className="mb-5">
              <Select
                classNamePrefix="select"
                id="sector"
                placeholder={messages.Sector}
                name="sector"
                isClearable
                onChange={(selectedOption) => {
                  setSectorErr("")
                  if (selectedOption) {
                    setSector(selectedOption);
                  } else {
                    setSector("");
                  }
                }}
                options={listOptions(sectorDpp)}
              />
              <FormFeedback className="d-block">
                {sectorErr}
              </FormFeedback>
              </FormGroup>
          </Col>
        </Row>}
        {buisinessOportunityddp?.length>0 && customerStatusDpp?.length>0 &&  <Row>
          <Col sm="12" md="6" lg="6" className={lang === "ar" ? "pl-3 pr-0" : "pl-0 pr-3"}>
            <FormGroup className="mb-5">
              <Select
                classNamePrefix="select"
                id="BusinessOpportunitytype"
                placeholder={messages.BusinessOpportunitytype + " " + messages.optional}
                name="business_opportunity_type"
                isClearable
                onChange={(selectedOption) => {
                  if (selectedOption) {
                    setBuisinessOportunityValue(selectedOption);
                  } else {
                    setBuisinessOportunityValue("");
                  }
                }}
                options={listOptions(buisinessOportunityddp)}
              />
            </FormGroup>
          </Col>
          <Col sm="12" md="6" lg="6" className="p-0">
            <FormGroup className="mb-5">
              <Select
                classNamePrefix="select"
                id="CustomerStatus"
                placeholder={messages.CustomerStatus}
                name="customer_status"
                isClearable
                onChange={(selectedOption) => {
                  setCustomerStatusErr("")
                  if (selectedOption) {
                    setCustomerStatus(selectedOption);
                  } else {
                    setCustomerStatus("");
                  }
                }}
                options={listOptions(customerStatusDpp)}
              />
              <FormFeedback className="d-block">
                {customerStatusErr}
              </FormFeedback>
            </FormGroup>
          </Col>
        </Row>}
        <FormGroup className="mb-5 customer_duo_date">
          <AppDatePicker
            minDate={moment().toDate()}
            id="customer_due_date"
            name="customer_due_date"
            isClearable
            lang={lang}
            placeholder={messages.WhenDoesTheCustomerNeedTheSystem}
            onChange={(date) => {
              formik.setFieldValue("customer_due_date", moment(date[0]).unix());
            }}
          />
          <FormFeedback className="d-block">
            {formik.touched.customer_due_date &&
              formik.errors.customer_due_date}
          </FormFeedback>
        </FormGroup>
        <FormGroup className="mb-5 text-area-container">
          <Input
            name="comment"
            type="textarea"
            rows="3"
            placeholder={messages.AdditionalComment + " " + messages.optional}
            onChange={(e) => {
              handleInputChange(e, "comment");
            }}
          />
        </FormGroup>
            <FormGroup className="mb-5">
              <FloatingLabelInput
                id="contact_person"
                type="text"
                name="contact_person"
                onChange={(e) => {
                  handleInputChange(e, "contact_person");
                }}
                label={messages.ContactPerson}
              />
              <FormFeedback className="d-block">
                {formik.touched.contact_person && formik.errors.contact_person}
              </FormFeedback>
            </FormGroup>
        <FormGroup className="mb-4">
          <h4 className="Siemens-Sans-black font-size-17 font-weight-900 headingColor">
            <FormattedMessage id="WhatIsTheLeadComposedOf" />
          </h4>
          {devicesDpp?.length>0 && dynamicDevicesLead &&
            dynamicDevicesLead.map((item) => {
              return (
                <FormGroup className="mb-4" key={item.id}>
                  <Select
                    classNamePrefix="select"
                    id="DevicesLeads"
                    placeholder={messages.DevicesLeads}
                    name="DevicesLeads"
                    isClearable
                    onChange={(selectedOption) => {
                      setDevicesErr("");
                      if (selectedOption) {
                        handleDevicesChange(selectedOption, item.id);
                      }else {
                        handleDevicesChange("", item.id);
                      }
                    }}
                    options={listOptions(devicesDpp)}
                  />
                </FormGroup>
              );
            })}
                              <FormFeedback className="d-block">
                  {DevicesErr}
                  </FormFeedback>
          <div className="d-flex justify-content-end">
            <div>
              <Button
                type="button"
                className="add-system-btn d-flex"
                onClick={() => {
                  handleAddDevice();
                }}
              >
                <img src={plus} alt="plus-icon" />
                <span className="mx-2">
                  <FormattedMessage id="AddSystem" />
                </span>
              </Button>
            </div>
          </div>
        </FormGroup>
        <Button type="submit" className="mb-5" onClick={()=>{handleOthers(formik.values)}}>
          <FormattedMessage id="Submit" />
        </Button>
      </Form>
    </div>
  );
};

export default injectIntl(LeadsCreate);
