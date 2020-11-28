import axios from "axios";
import queryString from "query-string";

const api = axios.create({
  baseURL: process.env.NODE_ENV === "development" ? "http://localhost:8000/api" : "/api",
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

export default api;

// api.interceptors.request.use(
//   (config) => {
//     const token = JSON.parse(sessionStorage.getItem("token")) || null;
//     // if (token) console.log("Token"); else console.log("No Token");
//     config.headers.Authorization = token ? `Bearer ${token.accessToken}` : "";
//     return config;
//   },
//   (error) => {
//     Promise.reject(error);
//   }
// );

// const refreshAuthLogic = (failedRequest) => {
// const token = JSON.parse(sessionStorage.getItem("token")) || {
//   accessToken: "",
//   refreshToken: "",
// };
// updateToken(failedRequest);
// return Promise.resolve();
// api
//   .post("/auth/refreshToken", { refreshToken: token.refreshToken })
//   .then((tokenRefreshResponse) => {
//     sessionStorage.setItem(
//       "token",
//       JSON.stringify(tokenRefreshResponse.data)
//     );
//     failedRequest.response.config.headers["Authorization"] =
//       "Bearer " + tokenRefreshResponse.data.accessToken;
//     return Promise.resolve();
//   });
// };

// createAuthRefreshInterceptor(api, refreshAuthLogic, { statusCodes: [401] });

// export default () => {
//   let accessToken = localStorage.getItem("token");
//   let headers = {
//     "Content-Type": "application/json",
//   };
//   if (accessToken && accessToken !== "") {
//     headers.Authorization = "Bearer " + accessToken;
//   }
//   const instance = axios.create({
//     baseURL: "http://localhost:8000/api",
//     headers: headers,
//   });

//   return instance;
// };

// import axios from "axios";

// export default () => {
//   let headers = {
//     "cache-control": "no-cache",
//   };
//   let accessToken = localStorage.getItem("token");

//   if (accessToken && accessToken !== "") {
//     headers.Authorization = "Bearer " + accessToken;
//   }
//   const instance = axios.create({
//     baseURL: "http://localhost:8000/api",
//     headers: headers,
//   });

//   instance.interceptors.response.use(
//     (response) => {
//       if (response.status === 401) {
//         //add your code
//         alert("You are not authorized");
//       }
//       return response;
//     },
//     (error) => {
//       if (error.response && error.response.data) {
//         //add your code
//         return Promise.reject(error.response.data);
//       }
//       return Promise.reject(error.message);
//     }
//   );

//   return instance;
// };
