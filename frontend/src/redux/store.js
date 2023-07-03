import { createStore, combineReducers, applyMiddleware, compose } from "redux";
// import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import auth from "../redux/reducers/authreducers";
import { orderData } from "../redux/reducers/orderreducers";
import { productData } from "../redux/reducers/productreducers";
import { inviteAdd } from "../redux/reducers/invitereducers";
import { organizationData } from "../redux/reducers/organizationreducers";

// // reducer list

// const rootReducer = combineReducers({
//   auth
// });
// // store
// const store = createStore(rootReducer, undefined, applyMiddleware(thunk));
// export default store;

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
const rootReducer = combineReducers({
  auth,
  orderData,
  productData,
  organizationData,
  inviteAdd
});
const middleware = [thunk];
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);
export default store;
