import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:1994",
  withCredentials: true
});

export { instance };
