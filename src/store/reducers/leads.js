
import * as types from '../types';

const INITIAL_STATE = {
  leadsList : [],
  leadListDetails : null
};

export default function leads(state = INITIAL_STATE, action) {
  
  switch (action.type) {
    case types.STORE_LEADS_LIST:
      return { ...state, leadsList: action.payload };
    case types.GET_LEAD_DETAILS:
      return {...state , leadListDetails: action.payload}
    default:
      return state;
  }
};