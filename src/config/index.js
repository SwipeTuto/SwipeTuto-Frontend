import axios from "axios";

// AXIOS SETTINGS

export default axios.create({
  baseURL: `http://localhost:8000/api/v1/`
});