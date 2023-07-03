import * as types from "../actionTypes";
import axios from "axios";
import { config } from "../header";

export const inviteModal = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_PUBLIC_URL}/invitation/send`,
      data,
      config()
    );

    if (response.status === 200) {
      dispatch({
        type: types.INVITE_ADD,
        payload: response.data,
      });
    }
    dispatch(getAllCoustmerList());
  } catch (error) {
    console.error("Error:", error);
  }
};
export const getCoustmer = () => async (dispatch) => {
  debugger
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_PUBLIC_URL}/invitation/get?status=1`,
      config()
    );
    if (response.status === 200) {
      dispatch({
        type: types.CUSTOMER_LIST,
        payload: response.data.user,
      });
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getAllCoustmerList = (value) => (dispatch) => {
  dispatch({
    type: types.CUSTOMER_LIST,
    payload: value,
  });
};