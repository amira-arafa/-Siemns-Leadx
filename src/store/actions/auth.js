import { axiosInstance } from "../../network/apis";
import { STORE_LOGIN_MICROSOFT, STORE_LOGIN_API_DATA } from "../types/auth";
import history from "../../routes/History";

export const loginAPi = (user) => async (dispatch) => {
  try {
    const res = await axiosInstance.post("/api/v1/users/login", user, {
      handlerEnabled: true,
    });
    dispatch(storeLoginApiData(res.data.data));
    localStorage.setItem("token",res?.data?.data?.user?.access_token);
    res && history.push("/leads")
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
