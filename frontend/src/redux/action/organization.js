import * as types from "../actionTypes";
import axios from "axios";
import { getUserData } from "./authaction";
import { config } from "../header";
const FormData = require("form-data");

export const addOrganization = (data, value) => async (dispatch) => {
  try {
    var formData = new FormData();

    if (value === true) {
    
      formData.append("address", data.address ? data.address : "");
      formData.append("city", data.city ? data.city : "");
      formData.append("email", data.email ? data.email : "");
      formData.append(
        "phone_number",
        data.phone_number ? data.phone_number : ""
      );
      formData.append("postal_code", data.postal_code ? data.postal_code : "");
      formData.append("taxNumber", data.tax_number ? data.tax_number : "");
      formData.append("country", data.country ? data.country : "");
    } else {
      formData.append("logo", data.logo[0]);
      formData.append("name", data.name);
    }

    await axios
      .post(
        `${process.env.REACT_APP_PUBLIC_URL}/organization`,
        formData,
        config()
      )
      .then(function (result) {
        if (result.status === 200) {
          dispatch({
            type: types.ORGANIZATION_ADD,
            payload: result.data,
          });
          dispatch(getUserData());
        }
      });
  } catch (error) {
    console.log("error", error);
  }
};
export const getAllOrganization = () => async (dispatch) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_PUBLIC_URL}/organization/`,
      config()
    );
    dispatch({ type: types.ORGANIZATION_LIST, payload: res.data });
  } catch (error) {
    console.log("err", error);
  }
};
