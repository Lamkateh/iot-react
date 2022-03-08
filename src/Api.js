import axios from "axios";

//require("dotenv").config();

export default axios.create({
  //baseURL: process.env.REACT_APP_API_URL,
  baseURL: "http://127.0.0.1:8000/api",
});
