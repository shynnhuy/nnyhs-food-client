import { useEffect, useState } from "react";
import axios from "axios";

const createTokenProvider = () => {
  let _token = JSON.parse(sessionStorage.getItem("token")) || "";
  const getExpirationDate = (jwtToken) => {
    if (!jwtToken) {
      return null;
    }

    const jwt = JSON.parse(atob(jwtToken.split(".")[1]));

    return (jwt && jwt.exp && jwt.exp * 1000) || null;
  };

  const isExpired = (exp) => {
    if (!exp) {
      return false;
    }
    return Date.now() > exp;
  };

  const getToken = async () => {
    if (!_token) {
      return null;
    }

    if (isExpired(getExpirationDate(_token.accessToken))) {
      const updatedToken = await fetch("/update-token", {
        method: "POST",
        body: _token.refreshToken,
      }).then((r) => r.json());

      setToken(updatedToken);
    }

    return _token && _token.accessToken;
  };

  const isLoggedIn = () => {
    return !!_token;
  };

  let observers = [];

  const subscribe = (observer) => {
    observers.push(observer);
  };

  const unsubscribe = (observer) => {
    observers = observers.filter((_observer) => _observer !== observer);
  };

  const notify = () => {
    const isLogged = isLoggedIn();
    observers.forEach((observer) => observer(isLogged));
  };

  const setToken = (token) => {
    if (token) {
      sessionStorage.setItem("REACT_TOKEN_AUTH", JSON.stringify(token));
    } else {
      sessionStorage.removeItem("REACT_TOKEN_AUTH");
    }
    _token = token;
    notify();
  };

  return {
    getToken,
    isLoggedIn,
    setToken,
    subscribe,
    unsubscribe,
  };
};

export const createAuthProvider = () => {
  const tokenProvider = createTokenProvider();

  const login = (newTokens) => {
    tokenProvider.setToken(newTokens);
  };

  const logout = () => {
    tokenProvider.setToken(null);
  };

  const authAxios = async (input, init) => {
    const token = await tokenProvider.getToken();

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    init = init || {};

    init.headers = {
      ...init.headers,
      Authorization: `Bearer ${token}`,
    };

    return axios(input, init);
  };

  const useAuth = () => {
    const [isLogged, setIsLogged] = useState(tokenProvider.isLoggedIn());

    useEffect(() => {
      const listener = (newIsLogged) => {
        setIsLogged(newIsLogged);
      };

      tokenProvider.subscribe(listener);
      return () => {
        tokenProvider.unsubscribe(listener);
      };
    }, []);

    return [isLogged];
  };

  return {
    useAuth,
    authAxios,
    login,
    logout,
  };
};

export const { useAuth, authAxios, login, logout } = createAuthProvider();
