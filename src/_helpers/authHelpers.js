export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const removeToken = () => {
  console.log("Remove token");
  localStorage.removeItem("token");
};

export const getAuthHeader = () => {
  if (!getToken()) return {};
  return {
    Authorization: `Token ${getToken()}`,
  };
};
