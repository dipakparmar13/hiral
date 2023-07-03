import * as types from "../actionTypes";
const initialState = {
  addOrganizationData: {},
  organizationList: [],
};
export const organizationData = (state = initialState, action) => {
  switch (action.type) {
    case types.ORGANIZATION_ADD:
      return {
        ...state,
        addProductData: action.payload,
      };
    case types.ORGANIZATION_LIST:
      return {
        ...state,
        organizationList: action.payload,
      };
    default:
      return state;
  }
};
