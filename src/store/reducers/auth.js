import * as types from "../types/auth";

const INITIAL_STATE = {
  loginMicrosoftMsal: localStorage.getItem("loginMicrosoftMsal") ? JSON.parse(localStorage.getItem("loginMicrosoftMsal")) :null,
  loginApiUserData:  localStorage.getItem("loginApiUserData") ? JSON.parse(localStorage.getItem("loginApiUserData")) :null,
  microsoftLoginData:  localStorage.getItem("microsoftLoginData") ? JSON.parse(localStorage.getItem("microsoftLoginData")) :null,
  logoutSpinner : false
};

export default function Auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.STORE_LOGIN_MICROSOFT:
      return {
        ...state,
        loginMicrosoftMsal: action.payload,
        microsoftLoginData: action.userData,
      };
    case types.STORE_LOGIN_API_DATA:
      return { ...state, loginApiUserData: action.payload };
    case types.SET_LOGOUT_SPINNER: 
      return { ...state , logoutSpinner: action.payload };
    default:
      return state;
  }
}
