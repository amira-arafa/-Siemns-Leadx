import axios from "axios";
import { requestHandler, successHandler, errorHandler } from "../interceptors";

export const axiosInstance = axios.create({
  baseURL: "http://tarekelsayed-001-site1.htempurl.com",
  headers: {
    'Accept': '*/*',
    'X-API-Key': 'F0CF9981-49BF-475F-B338-691D05F98520',
    'Content-Type': 'application/json' 
  }
});

// Handle request process
axiosInstance.interceptors.request.use(
  request => requestHandler(request)
);
// Handle response process
axiosInstance.interceptors.response.use(
  response => successHandler(response),
  error => errorHandler(error)
);
