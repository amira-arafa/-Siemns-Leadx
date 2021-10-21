import React, { useState } from "react";
import {
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  FormFeedback,
} from "reactstrap";
import moment from "moment-timezone";
import { FormattedMessage, injectIntl } from "react-intl";
import { useFormik } from "formik";
import * as Yup from "yup";
import AppDatePicker from "../../components/Button/AppDatePicker";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { createLeadApi } from "../../store/actions/leads";

const LeadsCreate = ({ intl }) => {
  const dispatch = useDispatch();
  const [ business_opportunity_type , setBuisinessOportunityValue ] = useState("")
  const [dynamicDevicesLead, setDynamicDevicesLead] = useState([
    {
      id: 1,
      value: "",
    },
  ]);
  const [initialValues] = useState({
    lead_name: "",
    hospital_name: "",
    region: "",
    business_opportunity_type: "",
    customer_status: "",
    customer_due_date: "",
    comment: "",
    contact_person: "",
  });

  const yupString = Yup.string();
  const yupObject = Yup.object();

  const validationSchema = Yup.object({
    lead_name: yupString.required(
      <FormattedMessage id="ThisFieldisRequired" />
    ),
    hospital_name: yupString.required(
      <FormattedMessage id="ThisFieldisRequired" />
    ),
    region: yupString.required(<FormattedMessage id="ThisFieldisRequired" />),
    customer_status: yupObject.required(
      <FormattedMessage id="ThisFieldisRequired" />
    ),
    customer_due_date: yupString.required(
      <FormattedMessage id="ThisFieldisRequired" />
    ),
    contact_person: yupString.required(
      <FormattedMessage id="ThisFieldisRequired" />
    ),
  });
  const onSubmit = (values, actions) => {
    let data = values;
    data.customer_status = data.customer_status.value;
    data.business_opportunity_type = business_opportunity_type.value;
    const devices = dynamicDevicesLead.forEach(function(v){ delete v.id });
    data.devices = devices;
    dispatch(createLeadApi(data));
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });
  const { messages } = intl;
  const handleInputChange = ({ target }, name, id) => {
    const { value } = target;
    switch (name) {
      case "DevicesLeads": {
        const findIndex = dynamicDevicesLead.findIndex(
          (item) => item.id === id
        );
        let foundDynamicDevicesLead = dynamicDevicesLead[findIndex];
        foundDynamicDevicesLead.value = value;
        const newDevices = dynamicDevicesLead.map(item=>{
          if(item.id === foundDynamicDevicesLead.id){
            return item = foundDynamicDevicesLead
          }else{
            return item;
          }
        })
        setDynamicDevicesLead(newDevices);
        return null;
      }
      case "hospital_name": {
        value
          ? formik.setFieldValue("hospital_name", value)
          : formik.setFieldValue("hospital_name", "");
        return null;
      }
      case "region": {
        value
          ? formik.setFieldValue("region", value)
          : formik.setFieldValue("region", "");
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
    <>
      <Form className="w-75 m-auto" onSubmit={formik.handleSubmit}>
        <h2>
          <FormattedMessage id="CreateNewLead" />
        </h2>
        <FormGroup>
          <Label>
            <FormattedMessage id="HospitalName" />
          </Label>
          <Input
            type="text"
            name="hospital_name"
            placeholder={messages.HospitalName}
            onChange={(e) => {
              handleInputChange(e, "hospital_name");
            }}
          />
          <FormFeedback className="d-block">
            {formik.touched.hospital_name && formik.errors.hospital_name}
          </FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label>
            <FormattedMessage id="Region" />
          </Label>
          <Input
            type="text"
            name="region"
            placeholder={messages.Region}
            onChange={(e) => {
              handleInputChange(e, "region");
            }}
          />
          <FormFeedback className="d-block">
            {formik.touched.region && formik.errors.region}
          </FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label>
            <FormattedMessage id="LeadName" />
          </Label>
          <Input
            type="text"
            name="lead_name"
            placeholder={messages.LeadName}
            onChange={(e) => {
              handleInputChange(e, "lead_name");
            }}
          />
          <FormFeedback className="d-block">
            {formik.touched.lead_name && formik.errors.lead_name}
          </FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label>
            <FormattedMessage id="BusinessOpportunitytype" />
          </Label>
          <Select
            classNamePrefix="select"
            id="BusinessOpportunitytype"
            placeholder={messages.BusinessOpportunitytype}
            name="business_opportunity_type"
            isClearable
            value={business_opportunity_type}
            onChange={(selectedOption)=>{
            if(selectedOption) {
              setBuisinessOportunityValue(selectedOption)
            }else{
              setBuisinessOportunityValue("")
            }
            }

            }
            options={[
              { label: messages.new, value: 1 },
              { label: messages.Replacement, value: 2 },
            ]}
          />
        </FormGroup>
        <FormGroup>
          <Label>
            <FormattedMessage id="CustomerStatus" />
          </Label>
          <Select
            classNamePrefix="select"
            id="CustomerStatus"
            placeholder={messages.CustomerStatus}
            name="customer_status"
            isClearable
            value={formik.values.customer_status}
            onChange={(selectedOption) => {
              if (selectedOption) {
                formik.setFieldValue("customer_status", selectedOption);
              } else {
                formik.setFieldValue("customer_status", "");
              }
            }}
            options={[
              { label: messages.Siemens, value: 1 },
              { label: messages.Competitor, value: 2 },
              { label: messages.NewCustomer, value: 3 },
            ]}
          />
          <FormFeedback className="d-block">
            {formik.touched.customer_status && formik.errors.customer_status}
          </FormFeedback>
        </FormGroup>
        <FormGroup>
          <AppDatePicker
            id="customer_due_date"
            name="customer_due_date"
            isClearable
            placeholder={messages.WhenDoesTheCustomerNeedTheSystem}
            value={formik.values.customer_due_date}
            onChange={(date) => {
              formik.setFieldValue("customer_due_date", moment(date[0]).unix());
            }}
          />
          <FormFeedback className="d-block">
            {formik.touched.customer_due_date &&
              formik.errors.customer_due_date}
          </FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label>
            <FormattedMessage id="AdditionalComment" />
          </Label>
          <Input
            name="comment"
            type="textarea"
            rows="3"
            placeholder={messages.AdditionalComment}
          />
        </FormGroup>
        <FormGroup>
          <Label>
            <FormattedMessage id="ContactPerson" />
          </Label>
          <Input
            type="text"
            name="contact_person"
            placeholder={messages.ContactPerson}
            onChange={(e) => {
              handleInputChange(e, "contact_person");
            }}
          />
          <FormFeedback className="d-block">
            {formik.touched.contact_person && formik.errors.contact_person}
          </FormFeedback>
        </FormGroup>
        <FormGroup>
          <h4>
            <FormattedMessage id="WhatIsTheLeadComposedOf" />
          </h4>
          {dynamicDevicesLead &&
            dynamicDevicesLead.map((item) => {
              return (
                <Input
                  key={item.id}
                  type="text"
                  id={item.id}
                  name="DevicesLeads"
                  className="mb-3"
                  placeholder={messages.DevicesLeads}
                  onChange={(e) => {
                    handleInputChange(e, "DevicesLeads", item.id);
                  }}
                />
              );
            })}
          <Button
            type="button"
            onClick={() => {
              handleAddDevice();
            }}
          >
            <FormattedMessage id="AddSystem" />
          </Button>
        </FormGroup>
        <Button type="submit">
          <FormattedMessage id="Submit" />
        </Button>
      </Form>
    </>
  );
};

export default injectIntl(LeadsCreate);
