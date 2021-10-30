import { axiosInstance } from "../../network/apis";
import { STORE_LOGIN_MICROSOFT, STORE_LOGIN_API_DATA, SET_LOGOUT_SPINNER } from "../types/auth";
import { deviceDetect } from "react-device-detect";
import history from "../../routes/History";

export const loginAPi = (user) => async (dispatch) => {
  try {
    const res = await axiosInstance.post("/api/v1/users/login", user, {
      handlerEnabled: true,
    });
    dispatch(storeLoginApiData(res.data.data));
    localStorage.setItem("token",res?.data?.data?.access_token);
    localStorage.setItem("loginApiUserData" , JSON.stringify(res?.data?.data))
    dispatch(storeFCMtocken({
      model : `${deviceDetect().browserName}${res?.data?.data?.access_token}`,
      token :  localStorage.getItem("firebaseToken")
    }))
    res && history.push("/leads")
  } catch (err) {
    console.log(err);
  }
};


export const storeFCMtocken = (body) => async (dispatch) => {
  try {
    await axiosInstance.put("/api/v1/fcm-tokens", body , {
      handlerEnabled: true,
    });
  } catch (err) {
    console.log(err);
  }
};

export const clearFCMtoken = (body) => async (dispatch) => {
  try {
    console.log("bodybodybody",body)
    const res = await axiosInstance.delete("/api/v1/fcm-tokens" , {data : body} , {
      handlerEnabled: true,
      body
    });
    if(res){
      localStorage.removeItem("token");
      localStorage.removeItem("loginMicrosoftMsal");
      localStorage.removeItem("loginApiUserData");
      localStorage.removeItem("microsoftLoginData");
      history.push({
        pathname: "/",
        state: {
          from: "logout",
        },
      });
    }
  } catch (err) {
    console.log(err);
  }
};




export const storeLoginApiData = (payload) => (
  {
    type : STORE_LOGIN_API_DATA,
    payload
  }
)

export const storeLoginMicrosoftInstance = (payload , userData) => ({
  type: STORE_LOGIN_MICROSOFT,
  payload,
  userData
});

export const changeLogoutSpinnerStatus = (payload ) => ({
  type: SET_LOGOUT_SPINNER,
  payload,
});



export const Auth = {
  getAuth() {
    const isAuthenticated =
     (localStorage.getItem("token") &&  localStorage.getItem("microsoftLoginData") &&  localStorage.getItem("loginApiUserData"))
        ? true
        : false;
    return isAuthenticated;
  }
};