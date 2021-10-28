import { axiosInstance } from "../../network/apis";
import History from "../../routes/History";
import { STORE_LEADS_LIST, GET_LEAD_DETAILS, STORE_BUISINESS_OPORTUNITIES , STORE_CUSTOMER_STATUS, STORE_DEVICES } from "../types/index"

export const createLeadApi = (data) => async (dispatch) => {
  try {
     await axiosInstance.post("/api/v1/leads", data, {
      handlerEnabled: true,
    });
    History.push("/leads")
  } catch (err) {
    console.log(err);
  }
};

export const getLeadsList = (params) => async (dispatch) => {
  try {
    const res = await axiosInstance.get("/api/v1/leads", {
      handlerEnabled: true,
      params
    });
    dispatch({
      type : STORE_LEADS_LIST ,
      payload : res.data
    })
  } catch (err) {
    console.log(err);
  }
};

export const getLeadDetails = (id) => async (dispatch) => {
  try {
    const res = await axiosInstance.get(`/api/v1/leads/${id}`, {
      handlerEnabled: true,
    });
    dispatch({
      type: GET_LEAD_DETAILS,
      payload: res?.data?.data
    })
  } catch (err) {
    console.log(err);
  }
};

export const getBuisinessOprtunities = (id) => async (dispatch) => {
  try {
    const res = await axiosInstance.get(`/api/v1/lookups/business_opportunities`, {
      handlerEnabled: true,
    });
    dispatch({
      type: STORE_BUISINESS_OPORTUNITIES,
      payload: res?.data?.data
    })
  } catch (err) {
    console.log(err);
  }
};

export const getCustomerStatus = (id) => async (dispatch) => {
  try {
    const res = await axiosInstance.get(`/api/v1/lookups/customer_status`, {
      handlerEnabled: true,
    });
    dispatch({
      type: STORE_CUSTOMER_STATUS,
      payload: res?.data?.data
    })
  } catch (err) {
    console.log(err);
  }
};


export const getDevices = (id) => async (dispatch) => {
  try {
    const res = await axiosInstance.get(`/api/v1/lookups/devices`, {
      handlerEnabled: true,
    });
    dispatch({
      type: STORE_DEVICES,
      payload: res?.data?.data
    })
  } catch (err) {
    console.log(err);
  }
};



