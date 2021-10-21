import { axiosInstance } from "../../network/apis";

export const createLeadApi = (data) => async (dispatch) => {
  try {
    const res = await axiosInstance.post("/api/v1/leads", data, {
      handlerEnabled: true,
    });
    console.log("REssss", res);
  } catch (err) {
    console.log(err);
  }
};
