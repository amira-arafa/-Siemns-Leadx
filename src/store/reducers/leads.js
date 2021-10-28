import * as types from "../types";
const INITIAL_STATE = {
  leadsList: [],
  leadListDetails: null,
  buisinessOportunityddp: null,
  devicesDpp: null,
  customerStatusDpp: null,
};

export default function leads(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.STORE_LEADS_LIST:
      return { ...state, leadsList: action.payload };
    case types.GET_LEAD_DETAILS:
      return { ...state, leadListDetails: action.payload };
    case types.STORE_BUISINESS_OPORTUNITIES:
      return { ...state, buisinessOportunityddp: action.payload };
    case types.STORE_CUSTOMER_STATUS:
      return { ...state, customerStatusDpp: action.payload };
    case types.STORE_DEVICES:
      return { ...state, devicesDpp: action.payload };
    default:
      return state;
  }
}
