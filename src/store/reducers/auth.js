import * as types from "../types/auth";

const INITIAL_STATE = {
  loginMicrosoftMsal: null,
  loginApiUserData: null,
  microsoftLoginData: null,
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
    default:
      return state;
  }
}
