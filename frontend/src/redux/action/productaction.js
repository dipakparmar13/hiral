import * as types from "../actionTypes";
import axios from "axios";
import { config } from "../header";
const FormData = require("form-data");


export const addProduct = (data) => async (dispatch) => {
  try {
    var formData = new FormData();
    formData.append("product_data", data.file[0]);

    await axios
      .post(`${process.env.REACT_APP_PUBLIC_URL}/product`, formData, config())
      .then(function (result) {
        if (result.status === 200) {
          dispatch({
            type: types.PRODUCT_ADD,
            payload: result.data,
          });
          dispatch(getAllProductData());
        }
      });
  } catch (error) {
    console.log("error", error);
  }
};
export const getAllProductData = (number) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_PUBLIC_URL}/product/get-all?page=${number}&limit=10`,
      config()
    );
    dispatch({ type: types.PRODUCT_LIST, payload: res.data });
  } catch (error) {
    console.log("err", error);
  }
};
