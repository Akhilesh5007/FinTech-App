// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:5000", // json-server root
//   headers: { "Content-Type": "application/json" }
// });

// export default api;
import axios from "axios";

const api = axios.create({
  baseURL: "https://json-server-api-skp6.onrender.com"
});

export default api;
