import React, { useEffect, useState } from "react";
import { Button, Card, Form, Row, Col } from "react-bootstrap";
import { getLocalText } from "../localate/i18nextInit";
import { validateAddressCard } from "./validation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhoneInput from "react-phone-input-2";
import ToastMessage from "./toast";
import { useDispatch, useSelector } from "react-redux";
import { addOrganization } from "../redux/action/organization";
import axios from "axios";
import { getUserData } from "../redux/action/authaction";
import { config } from "../redux/header";

function AddressCard() {
  const [errors, setErrors] = useState({});
  const { userList } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [inpval, setInpval] = useState();
  const [edit, setEdit] = useState(false);
  const onchangehandle = (e) => {
    setInpval({ ...inpval, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null });
    setEdit(true);
  };
  const value = true;
  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  useEffect(() => {
    setInpval(userList?.organization);
  }, [userList?.organization]);

  const handleAddressCard = async () => {
    let formErrors = validateAddressCard(inpval);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else if (
      userList?.organization?.user_id &&
      JSON.stringify(inpval) !== JSON.stringify(userList?.organization) &&
      Object.keys(formErrors).length < 1
    ) {
      var formData = new FormData();
      formData.append("id", inpval?._id);
      formData.append("email", inpval?.email);
      formData.append("phone_number", inpval?.phone_number);
      formData.append("address", inpval?.address);
      formData.append("tax_number", inpval?.tax_number);
      formData.append("country", inpval?.country);
      formData.append("postal_code", inpval?.postal_code);
      formData.append("city", inpval?.city);

      try {
        await axios.patch(
          `${process.env.REACT_APP_PUBLIC_URL}/organization/`,
          formData,
          config()
        );
        dispatch(getUserData());
      } catch (error) {
        console.log(error);
      }
    } else if (!userList?.organization?.user_id) {
      dispatch(addOrganization(inpval, value));
      toast(<ToastMessage />);
    }
  };

  const phoneValidation = (value) => {
    setInpval({ ...inpval, phone_number: value });

    const phoneValid = /^\+?\d{0,2}\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    if (value && !phoneValid.test(value)) {
      setErrors({
        ...errors,
        phoneNumber: (errors.phone_number = getLocalText(
          "InvitationModal.Validation.phoneNumber"
        )),
      });
    } else {
      setErrors({ ...errors, phone_number: null });
    }
  };
  return (
    <>
      <Card className="shadow-c">
        <Card.Body>
          <h5 className="text-black font-regular mb-2">
            {getLocalText("AddressCard.address")}
          </h5>
          <p className="mb-10 text-roboto">
            {getLocalText("AddressCard.completingData")}
          </p>
          <Row className="gy-3 mb-10">
            <Col md={6}>
              <Form.Label className="text-dark">
                {getLocalText("Common.email")}
              </Form.Label>
              <Form.Control
                value={inpval?.email ? inpval?.email : ""}
                type="email"
                name="email"
                onChange={(e) => onchangehandle(e)}
                className="text-roboto"
              />
              <p className="text-danger">{errors.email}</p>
            </Col>
            <Col md={6}>
              <Form.Label className="text-dark">
                {getLocalText("Common.phoneNumber")}
              </Form.Label>
              <div className="country-select ">
                <PhoneInput
                  className="shadow-none rounded-2 input text-roboto"
                  containerClass="input-group"
                  inputClass="form-control-lg rounded-2 ps-16 pe-0 border-0 bg-transparent"
                  buttonClass="start-2 top-2 bottom-2 border-0 overlap-10 bg-transparent rounded-5"
                  country="ca"
                  value={
                    inpval?.phone_number?.toString()
                      ? inpval?.phone_number?.toString()
                      : ""
                  }
                  dropdownClass="shadow-2 rounded-2"
                  placeholder={getLocalText("LoginForm.placeHolder")}
                  onChange={(e) => phoneValidation(e)}
                />
              </div>
              <p className="text-danger">{errors.phone_number} </p>
            </Col>
            <Col md={12}>
              <Form.Label className="text-dark">
                {getLocalText("AddressCard.addres")}
              </Form.Label>
              <Form.Control
                value={inpval?.address ? inpval?.address : ""}
                type="text"
                className="mb-3 text-roboto"
                name="address"
                onChange={(e) => onchangehandle(e)}
              />
              <p className="text-danger">{errors.address}</p>
            </Col>
            <Col md={12}>
              <Form.Label className="text-dark">
                {getLocalText("AddressCard.taxNumber")}
              </Form.Label>
              <Form.Control
                value={inpval?.tax_number ? inpval?.tax_number : ""}
                type="number"
                className="mb-3 text-roboto"
                name="tax_number"
                onChange={(e) => onchangehandle(e)}
              />
              <p className="text-danger">{errors.tax_number}</p>
            </Col>
            <Col md={6}>
              <Form.Label className="text-dark">
                {getLocalText("AddressCard.city")}
              </Form.Label>
              <Form.Control
                value={inpval?.city ? inpval?.city : ""}
                type="text"
                name="city"
                onChange={(e) => onchangehandle(e)}
                className="text-roboto"
              />
              <p className="text-danger">{errors.city}</p>
            </Col>
            <Col lg={3} md={6}>
              <Form.Label className="text-dark">
                {getLocalText("AddressCard.country")}
              </Form.Label>
              <Form.Control
                value={inpval?.country ? inpval?.country : ""}
                type="text"
                name="country"
                className="text-roboto"
                onChange={(e) => onchangehandle(e)}
              />
              <p className="text-danger">{errors.country}</p>
            </Col>
            <Col lg={3} md={6}>
              <Form.Label className="text-dark">
                {getLocalText("AddressCard.postalCode")}{" "}
              </Form.Label>
              <Form.Control
                value={inpval?.postal_code ? inpval?.postal_code : ""}
                className="input text-roboto"
                type="number"
                name="postal_code"
                onChange={(e) => onchangehandle(e)}
              />
              <p className="text-danger">{errors.postal_code}</p>
            </Col>
          </Row>
          {edit && (
            <div className="d-flex justify-content-lg-end">
              <Button
                variant="neutral"
                className="font-bold text-sm me-3"
                onClick={() => setEdit(false)}
              >
                {getLocalText("Common.cancel")}
              </Button>
              <Button
                variant="primary"
                className="bg-indigo-500 border-indigo-500 px-2 text-sm font-bold"
                onClick={() => handleAddressCard()}
              >
                {userList?.organization?.user_id
                  ? getLocalText("Common.update")
                  : getLocalText("Common.save")}
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>
    </>
  );
}
export default AddressCard;
