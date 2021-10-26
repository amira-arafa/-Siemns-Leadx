import { axiosInstance } from "../../network/apis";
import { STORE_LEADS_LIST, GET_LEAD_DETAILS } from "../types/index"

export const createLeadApi = (data) => async (dispatch) => {
  try {
     await axiosInstance.post("/api/v1/leads", data, {
      handlerEnabled: true,
    });
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
    console.log("res",res.data)
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


