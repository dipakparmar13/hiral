import * as types from "../actionTypes";
const initialState = {
  orderItems: [],
  getOrderDetails:{}
};
export const orderData = (state = initialState, action) => {    
  switch (action.type) {
    case types.ORDER_LIST:
      return {
        ...state,
        orderItems: action.payload,
      };
    case types.ORDER_GET:
      return {
        ...state,
        getOrderDetails: action.payload,
      };

    default:
      return state;
  }
};
