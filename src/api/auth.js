import { getAuthHeader } from "../_helpers/authHelpers";

export const fetchApi = {
  get: request("GET"),
  post: request("POST"),
};

function request(method) {
  return (url, body) => {
    const requestSent = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
    };

    if (body) {
      requestSent.body = JSON.stringify(body);
    }
    console.log(requestSent);
    return fetch(process.env.REACT_APP_API_URL + url, requestSent);
  };
}
