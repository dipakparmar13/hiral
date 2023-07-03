import * as types from "../actionTypes";
const initialState = {
  addProductData: {},
  getAllProduct:{},
};
export const productData = (state = initialState, action) => {
  switch (action.type) {
    case types.PRODUCT_ADD:
      return {
        ...state,
        addProductData: action.payload,
      };
    case types.PRODUCT_LIST:
      return {
        ...state,
        getAllProduct: action.payload,
      };
    default:
      return state;
  }
};
