import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducer from "./reducer";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["admin", "snack"],
};
const pReducer = persistReducer(persistConfig, reducer);

const middleWares = [thunk];

const store = createStore(
  pReducer,
  composeWithDevTools(applyMiddleware(...middleWares))
);
export const persistor = persistStore(store);

export default store;
