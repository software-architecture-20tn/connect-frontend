import { getAuthHeader } from "../_helpers/authHelpers";

export const fetchApi = {
  get: request("GET"),
  post: request("POST"),
  put: request("PUT"),
};

function request(method) {
  return async (url, body) => {
    const requestSent = {
      method,
      headers: {
        ...getAuthHeader(),
      },
    };
    if (body) {
      if (body instanceof FormData) {
        requestSent.body = body;
      } else {
        requestSent.headers["Content-Type"] = "application/json";
        requestSent.body = JSON.stringify(body);
      }
    }
    // console.log(requestSent);
    const response = await fetch(
      process.env.REACT_APP_API_URL + url,
      requestSent,
    );
    if (response.status === 401) {
      localStorage.removeItem("token");
    }
    return response;
  };
}
