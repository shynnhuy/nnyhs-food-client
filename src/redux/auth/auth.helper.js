export const getExpirationDate = (jwtToken) => {
  if (!jwtToken) {
    return null;
  }

  const jwt = JSON.parse(atob(jwtToken.split(".")[1]));
  // console.log(jwt);
  // console.log((jwt && jwt.exp && jwt.exp * 1000) || null);

  return (jwt && jwt.exp && jwt.exp * 1000) || null;
};

export const isExpired = (exp) => {
  if (!exp) {
    return false;
  }
  return Date.now() > exp;
};

export const setToken = (token) => {
  if (token) {
    localStorage.setItem("token", JSON.stringify(token));
  } else {
    localStorage.removeItem("token");
  }
};
