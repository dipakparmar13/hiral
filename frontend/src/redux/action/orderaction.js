import * as types from "../actionTypes";
import axios from "axios";
import { config } from "../header";

export const getOrderList = (number) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_PUBLIC_URL}/order/get-filter-wise?order_status=see_everything&page=${number}`,
      config()
    );
    dispatch(orderData(res.data.results));
  } catch (error) {
    console.log("error", error);
  }
};

export const orderData = (value) => (dispatch) => {
  dispatch({
    type: types.ORDER_LIST,
    payload: value,
  });
};
export const getOrder = (itemId) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_PUBLIC_URL}/order/get/${itemId}`,
      config()
    );

    dispatch({
      type: types.ORDER_GET,
      payload: res.data,
    });
  } catch (error) {
    console.log("error", error);
  }
};

