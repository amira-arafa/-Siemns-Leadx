import { axiosInstance } from "../../network/apis";
import History from "../../routes/History";
import toasters from "../../utils/toasters";
import { STORE_LEADS_LIST, GET_LEAD_DETAILS, STORE_BUISINESS_OPORTUNITIES , STORE_CUSTOMER_STATUS, STORE_DEVICES , STORE_REGIONS, STORE_SECTORS } from "../types/index"

export const createLeadApi = (data) => async (dispatch) => {
  try {
     await axiosInstance.post("/api/v1/leads", data, {
      handlerEnabled: true,
    });
    History.push("/leads")
  } catch (err) {
    toasters.Error(err?.response?.data?.errors[0]?.error)
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

export const getRegions = (id) => async (dispatch) => {
  try {
    const res = await axiosInstance.get(`/api/v1/lookups/regions`, {
      handlerEnabled: true,
    });
    dispatch({
      type: STORE_REGIONS,
      payload: res?.data?.data
    })
  } catch (err) {
    console.log(err);
  }
};

export const getSectors = (id) => async (dispatch) => {
  try {
    const res = await axiosInstance.get(`/api/v1/lookups/sectors`, {
      handlerEnabled: true,
    });
    dispatch({
      type: STORE_SECTORS,
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



