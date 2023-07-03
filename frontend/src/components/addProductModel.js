import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getLocalText } from "../localate/i18nextInit";
import { addProduct, getAllProductData } from "../redux/action/productaction";
import { toast } from "react-toastify";
import ToastMessage from "./toast";

export default function AddProductModel({ hide, show }) {

  const dispatch = useDispatch();
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [product, setProduct] = useState(false);

  const setFeild = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };

  const handleSubmit = () => {
    // const { file } = form;
    // let productRecoard = {
    //   file: file,
    // };
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      dispatch(addProduct(form));
      setProduct(true)
      toast(<ToastMessage />);
      hide();
    }
  };

  const validateForm = () => {
    const { file } = form;
    const errors = {};
    if (!file)
      errors.file = getLocalText("InvitationModal.Validation.customerAccount");
    return errors;
  };
  useEffect(() => {
    dispatch(getAllProductData());
     }, [dispatch,product]);

  return (
    <div>
      <Modal
        show={show}
        onHide={hide}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="border-bottom-0 pb-0">
          <Modal.Title id="contained-modal-title-vcenter" className="text-xl">
            {getLocalText("ProductModal.AddProduct")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <Form.Group className="mb-3" controlId="profilepic">
            <Row>
              <Col md={3} className="my-auto ">
                <Form.Label>{getLocalText("ProductModal.File")}</Form.Label>
              </Col>
              <Col md={9}>
                <Form.Control
                  type="file"
                  name="file"
                  accept=".xlsx,.xls"
                  placeholder={getLocalText("ProductModal.ChooseFile")}
                  autoFocus
                  onChange={(e) => setFeild("file", e.target.files)}
                  isInvalid={!!errors["file"]}
                />
                <p className="text-danger m-auto"> {errors.file} </p>
              </Col>
            </Row>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="border-none  justify-content-start pb-8 ">
          <Button
            variant="success"
            className="me-2 my-0 "
            onClick={handleSubmit}
          >
            {getLocalText("ProductModal.Save")}
          </Button>
          <Button variant="primary" className="my-0 ms-0" onClick={hide}>
            {getLocalText("ProductModal.Cancel")}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
