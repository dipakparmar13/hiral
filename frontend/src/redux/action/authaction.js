/* eslint-disable no-cond-assign */
import axios from "axios";
import * as types from "../actionTypes";
import { config } from "../header";

export const loginWithNumber =
  (countryCode, phoneNumber) => async (dispatch) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_PUBLIC_URL}/auth/login-with-number`,
        {
          number: "+" + countryCode + phoneNumber,
        }
      );
      await dispatch({ type: types.NUMBER_LOGIN, payload: res.data });
    } catch (error) {
      console.error("err", error);
    }
  };

export const otpVerify =
  (otp, countryCode, phoneNumber) => async (dispatch) => {
    try {
      await axios
        .post(`${process.env.REACT_APP_PUBLIC_URL}/auth/otp-verify`, {
          otp: otp,
          number: "+" + countryCode + phoneNumber,
        })
        .then((result) => {
          if (result.status === 200) {
            localStorage.setItem("token", result.data.token);
            localStorage.setItem("isLogin", true);
            dispatch({ type: types.OTP_VARIFY, payload: result });
          } else {
            dispatch({ type: types.LOGIN_ERROR, payload: result.status });
            console.log("error");
          }
        });
    } catch (error) {
      dispatch({ type: types.LOGIN_ERROR, payload: error.response.data });

      console.error("err", error);
    }
  };
  export const getUserData = () => async (dispatch) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_PUBLIC_URL}/auth/user/get`,
         config()
      );
       dispatch({
         type: types.USER_LIST,
         payload: res.data.data
       });
      
    } catch (error) {
      console.log("error", error);
    }
  }; 

// export const tokenSet = (token) => {
//   return {
//     type: types.TOKEN_STORE,
//     token,
//   };
// };

export const languageSet = (language) => {
 
  return {
    type: types.LANGUAGE_SET,
    payload: language
  };
}
