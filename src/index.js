import React, {Suspense, useCallback, useEffect} from "react";
import ReactDOM from "react-dom";
import {createBrowserHistory} from "history";
import {Router as BrowserRouter} from "react-router-dom";
import {SnackbarProvider} from "notistack";

import "assets/scss/App.scss";

import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import store, {persistor} from "redux/store";
import StableDispatchProvider from "redux/stableDispatch";
import {
    getRoles,
    loadUser,
    logout,
    updateToken,
} from "redux/auth/auth.actions";
import {getCategories} from "redux/shop/shop.actions";

import Notifier from "components/core/Notifier";

import api from "Api";

import App from "App";
import {Slide} from "@material-ui/core";
import SThemeProvider from "context/ThemeContext";
import {setToken} from "redux/auth/auth.helper";
import {UPDATE_TOKEN} from "redux/auth/auth.types";
import {enqueueSnackbar} from "redux/snackbar/snackbar.actions";

import {css} from "@emotion/core";
import RingLoader from "react-spinners/RingLoader";

const hist = createBrowserHistory();

const override = css`
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
`;

const Root = () => {
    const getToken = useCallback(() => {
        return store.getState().auth.token
    }, []);
    const token = getToken();
    useEffect(() => {
        store.dispatch(getRoles());
        store.dispatch(getCategories());
    }, []);
    useEffect(() => {
        store.dispatch(loadUser());
    }, [token]);

    api.interceptors.request.use((config) => {
        const storeToken =
            getToken() || JSON.parse(localStorage.getItem("token"));
        if (!config.headers.Authorization) {
            config.headers.Authorization = storeToken
                ? `Bearer ${storeToken.accessToken}`
                : "";
        }
        return config;
    });

    api.interceptors.response.use(
        (next) => next,
        (error) => {
            const status = error.response ? error.response.status : null;
            if (status !== 401) {
                return new Promise((resolve, reject) => {
                    reject(error);
                });
            }

            store.dispatch(
                enqueueSnackbar({
                    message: error.response.statusText || "Unexpected Error",
                    status: "error",
                })
            );

            if (error.config.url === "/auth/refreshToken") {
                store.dispatch(logout());
                hist.push("/");

                return new Promise((resolve, reject) => {
                    reject(error);
                });
            }

            return api
                .post("/auth/refreshToken", {refreshToken: getToken().refreshToken})
                .then((res) => {
                    setToken(res.data);
                    store.dispatch({
                        type: UPDATE_TOKEN,
                        payload: res.data,
                    });
                    store.dispatch(updateToken());
                    const config = error.config;
                    config.headers["Authorization"] = `Bearer ${res.data.accessToken}`;

                    return new Promise((resolve, reject) => {
                        api
                            .request(config)
                            .then((response) => {
                                resolve(response);
                            })
                            .catch((error) => {
                                reject(error);
                            });
                    });
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        }
    );

    return (
        // <RingLoader css={override} size={150} color={"red"} loading={true} />
        <Provider store={store}>
            <PersistGate
                loading={
                    <RingLoader css={override} size={150} color={"red"} loading={true}/>
                }
                persistor={persistor}
            >
                <StableDispatchProvider>
                    <Suspense
                        fallback={
                            <RingLoader
                                css={override}
                                size={150}
                                color={"red"}
                                loading={true}
                            />
                        }
                    >
                        <BrowserRouter history={hist}>
                            <SThemeProvider>
                                <SnackbarProvider
                                    maxSnack={3}
                                    preventDuplicate
                                    autoHideDuration={3000}
                                    TransitionComponent={Slide}
                                >
                                    <App/>
                                    <Notifier/>
                                </SnackbarProvider>
                            </SThemeProvider>
                        </BrowserRouter>
                    </Suspense>
                </StableDispatchProvider>
            </PersistGate>
        </Provider>
    );
};

ReactDOM.render(<Root/>, document.getElementById("root"));

// Api.interceptors.request.use(function (config) {
//   const token = store.getState().auth.token;
//   config.headers["Authorization"] = `Bearer ${token}`;

//   return config;
// });
// jwt.verify(token, process.env.REACT_APP_SECRET_JWT, (err, decode) => {
//   console.log(decode, process.env.REACT_APP_SECRET_JWT);
// });
