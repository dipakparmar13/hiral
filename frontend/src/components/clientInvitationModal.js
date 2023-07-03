import { React, useState } from "react";
import {
  Button,
  Form,
  Modal,
  Row,
  Col,
  Nav,
} from "react-bootstrap";
import Select from "react-select";
import PhoneInput from "react-phone-input-2";
import { getLocalText } from "../localate/i18nextInit";
// import { FiChrome } from "react-icons/fi";
import { validateInvitationModal } from "./validation";
import { useDispatch, useSelector } from "react-redux";
import { inviteModal } from "../redux/action/inviteaction";
import ToastMessage from "./toast";
import { toast } from "react-toastify";

const options = [
  { value: "restaurant", label: "Restaurant" },
  { value: "epiceries", label: "Épiceries" },
  { value: "hôpitaux", label: "Hôpitaux" },
  { value: "entreprise", label: "Entreprise" },
];

function InvitationModal({ hide, show }) {
  const dispatch = useDispatch();
  const { userList } = useSelector((state) => state.auth);
  const [errors, setErrors] = useState({});
  const [inpval, setInpval] = useState({
    organization_id: userList?.organization?._id,
    customer_account: "",
    mobile_number: "",
    organization_type: "",
    email: "",
  });
  const [buttonArray, setbuttonArray] = useState([
    { text: "Email", selected: false },
    { text: "SMS", selected: false },
  ]);
  const onchangehandle = (e) => {
    setInpval({ ...inpval, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null });
  };

  const selectlanguage = (name) => {
    const organization_type = name.value;
    setInpval({ ...inpval, organization_type });
    setErrors({ ...errors, organization_type: null });
  };
  const handleInvitationModal = async () => {
    let formErrors = validateInvitationModal(inpval, buttonArray[0].selected);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      const invitationData = {
        organization_id: userList?.organization?._id,
        customer_account: inpval.customer_account,
        organization_type: inpval.organization_type,
        [buttonArray[0].selected ? "email" : "mobile_number"]: buttonArray[0]
          .selected
          ? inpval.email
          : inpval.mobile_number,
      };
      dispatch(inviteModal(invitationData));
      toast(<ToastMessage />);
      hide();
    }
  };

  const phoneValidation = (value) => {
    setInpval({ ...inpval, mobile_number: value });

    const phoneValid = /^\+?\d{0,2}\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    if (value && !phoneValid.test(value)) {
      setErrors({
        ...errors,
        mobile_number: (errors.mobile_number = getLocalText(
          "InvitationModal.Validation.phoneNumber"
        )),
      });
    } else {
      setErrors({ ...errors, mobile_number: null });
    }
  };
  const handleButtonState = (index) => {
    let temp = buttonArray;
    temp = temp.map((val, ind) => {
      if (ind === index) {
        val.selected = !val.selected;
      } else if (index) {
        val.selected = false;
      } else {
        val.selected = false;
      }
      return val;
    });
    setbuttonArray([...temp]);
  };
  return (
    <Modal
      show={show}
      onHide={hide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="border-bottom-0 pb-0">
        <Modal.Title id="contained-modal-title-vcenter" className="text-xl">
          {getLocalText("Common.invitation")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col sm={12}>
            <Nav variant="neutral" className="nav-tabs modal-tab w-max">
              {buttonArray.map((item, index) => (
                <Nav.Item key={index.toString()}>
                  <Nav.Link
                    active={item.selected}
                    onClick={() => handleButtonState(index)}
                  >
                    {getLocalText(item.text)}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
            <Form.Group className="">
              <Form.Label className="text-corn-blue font-bold mt-5">
                {getLocalText("InvitationModal.customerAccount")}
              </Form.Label>
              <Form.Control
                type="text"
                className="mb-10 text-roboto"
                value={inpval.customer_account}
                name="customer_account"
                onChange={(e) => onchangehandle(e)}
              />
            </Form.Group>
            <p
              className="text-danger mb-5 text-roboto"
              style={{ marginTop: "-20px" }}
            >
              {errors.company_name}
            </p>
            {buttonArray[0].selected === true ? (
              <Form.Control
                type="email"
                className="mb-10 text-roboto"
                placeholder="Please Enter Your email"
                value={inpval.email}
                name="email"
                onChange={(e) => onchangehandle(e)}
              />
            ) : (
              <Form.Group className="mb-10 country-select hstack rounded-2 text-roboto">
                <PhoneInput
                  className="shadow-none rounded-2 input text-roboto"
                  containerClass="input-group"
                  inputClass="form-control-lg rounded-2 ps-16 pe-0 border-0 bg-transparent"
                  buttonClass="start-2 top-2 bottom-2 border-0 overlap-10 bg-transparent rounded-5"
                  country="ca"
                  value={inpval.mobile_number}
                  dropdownClass="shadow-2 rounded-2"
                  placeholder={getLocalText("LoginForm.placeHolder")}
                  onChange={(e) => phoneValidation(e)}
                />
              </Form.Group>
            )}
            {buttonArray[0].selected === true ? (
              <p className="text-danger mb-5" style={{ marginTop: "-20px" }}>
                {errors.email}
              </p>
            ) : (
              <p className="text-danger mb-5" style={{ marginTop: "-20px" }}>
                {errors.mobile_number}
              </p>
            )}
            <Form.Group>
              <Select
                options={options}
                onChange={(e) => selectlanguage(e)}
                placeholder={"Type d'organisation"}
                styles={{
                  option: (base) => ({
                    ...base,
                    border: `1px dotted transparent`,
                    borderRadius: "6px",
                    height: "100%",
                    width: "95%",
                    margin: "auto",
                  }),
                }}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 0,
                  colors: {
                    ...theme.colors,
                    primary: "#4C6FFF",
                  },
                })}
                className="mb-10 text-roboto"
              />
            </Form.Group>
            <p className="text-danger mb-5" style={{ marginTop: "-20px" }}>
              {errors.organization_type}
            </p>
            <Button
              variant="primary"
              className="my-0 mx-auto w-max d-flex"
              onClick={handleInvitationModal}
            >
              {getLocalText("Common.invite")}
            </Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}

export default InvitationModal;
