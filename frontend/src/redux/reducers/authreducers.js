import * as types from "../actionTypes";

const initialState = {
  userList: [],
  language: "",
  isLogin: false,
  userData: null,
  sendOtp: false,
  otp: null,
  authToken: null,
};
const auth = (state = initialState, action) => {
  switch (action.type) {
    case types.NUMBER_LOGIN:
      return {
        ...state,
        userData: action.payload,
        sendOtp: true,
      };
    case types.OTP_VARIFY:
      return {
        ...state,
        isLogin: true,
        sendOtp: false,
        otp1: action.payload,
      };
    case types.LOGIN_ERROR:
      return {
        ...state,
        otp1: action.payload,
        isLogin: false,
      };
    case types.TOKEN_STORE:
      return {
        ...state,
        authToken: { authorization: `Bearer ${action.token}` },
      };
    case types.USER_LIST:
      return {
        ...state,
        userList: action.payload,
      };
    case types.LANGUAGE_SET:
      return {
        ...state,
        language: action.payload,
      };
    default:
      return state;
  }
};

export default auth;
