
import * as types from '../types';

const INITIAL_STATE = {
  leadsList : []
};

export default function leads(state = INITIAL_STATE, action) {
  
  switch (action.type) {
    case types.STORE_LEADS_LIST:
      return { ...state, leadsList: action.payload };
    default:
      return state;
  }
};