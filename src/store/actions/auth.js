import { axiosInstance } from "../../network/apis";

export const loginAPi = (user) => async (dispatch) => {
  try {
    const res = await axiosInstance.post("/api/v1/users/login", user, {
      handlerEnabled: true,
    });
console.log("REs",res)
}
catch (err){
    console.log(err)
}
}