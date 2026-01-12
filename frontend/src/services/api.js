import axios from "axios";

const API = axios.create({
  baseURL: "https://clinic-website-cms.onrender.com/api"
});

export default API;
