import * as types from "../actionTypes";
const initialState = {
    invateItems: [],
    getAllCoustmer: []
};
export const inviteAdd = (state = initialState, action) => {
    switch (action.type) {
        case types.INVITE_ADD:
            return {
                ...state,
                invateItems: action.payload,
            };
        case types.CUSTOMER_LIST:
            return {
                ...state,
                getAllCoustmer: action.payload,
            };
        default:
            return state;
    }
};
