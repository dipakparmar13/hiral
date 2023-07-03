import { React, useState } from "react";
import { Button, Form, Modal, Row, Col } from "react-bootstrap";
import Select from "react-select";
import { getLocalText } from "../localate/i18nextInit";
import { BsTrash } from "react-icons/bs";

const options = [
  {
    value: "Admin",
    label: getLocalText("InviteMemberModal.Options.Admin"),
  },
  {
    value: "Employe",
    label: getLocalText("InviteMemberModal.Options.Employe"),
  },
  {
    value: "Administrator",
    label: getLocalText("InviteMemberModal.Options.Administrator"),
  },
  {
    value: "Facturation",
    label: getLocalText("InviteMemberModal.Options.Billing"),
  },
];

function InviteMemberModal({ hide, show }) {
  const [inpval, setInpval] = useState([
    {
      email: "",
      role: "",
    },
  ]);

  const formValidation = (inpval) => {
    const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    const data = [...inpval];
    let valid = true;
    for (let index = 0; index < data.length; index++) {
      if (data[index].email === "") {
        data[index].emailError = getLocalText(
          "InviteMemberModal.Validation.email"
        );
        valid = false;
      } else if (!regEx.test(data[index].email)) {
        data[index].emailError = getLocalText(
          "InviteMemberModal.Validation.email"
        );
        valid = false;
      }
      if (data[index].role === "") {
        data[index].roleError = getLocalText(
          "InviteMemberModal.Validation.role"
        );
        valid = false;
      }
    }
    setInpval(data);
    return valid;
  };

  const onchangehandle = (i, e) => {
    let newInpval = [...inpval];
    newInpval[i][e.target.name] = e.target.value;
    newInpval[i].emailError = "";

    setInpval(newInpval);
  };

  const selectlanguage = (index, e, value) => {
    const role = e.value;
    let newInpval = [...inpval];
    newInpval[index][value?.name] = role;
    newInpval[index].roleError = "";

    setInpval(newInpval);
  };

  const handleInviteMemberModal = async () => {
    const isValid = formValidation(inpval);

    if (isValid) {
      alert(JSON.stringify(inpval));
    }
  };
  const addFormFields = () => {
    setInpval([...inpval, { email: "", role: "" }]);
  };
  let removeFormFields = (i) => {
    let newInpval = [...inpval];
    newInpval.splice(i, 1);
    setInpval(newInpval);
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={hide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="border-bottom-0 pb-0 d-block">
        <h6 className="font-regular mb-2">{getLocalText("Common.members")}</h6>
        <p style={{ color: "#6B7B93" }} className="text-roboto">
          {getLocalText("InviteMemberModal.manageAndInvite")}
        </p>
      </Modal.Header>
      <Modal.Body>
        {inpval?.map((item, index) => {
          return (
            <div key={index}>
              <Row className="gy-2 mb-8 position-relative">
                <Col lg={7}>
                  <Form.Label className="text-13 font-regular">
                    {getLocalText("InviteMemberModal.emailAddress")}
                  </Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={item.email}
                    onChange={(e) => {
                      onchangehandle(index, e);
                    }}
                  />
                  {item.emailError && (
                    <p className="text-danger">{item.emailError}</p>
                  )}
                </Col>
                <Col lg={5}>
                  <Form.Label className="text-13 font-regular">
                    {getLocalText("Common.role")}
                  </Form.Label>
                  <Select
                    className="member-select"
                    name="role"
                    options={options}
                    onChange={(e, value) => {
                      selectlanguage(index, e, value);
                    }}
                    placeholder={getLocalText("Common.typeOfOrganization")}
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
                  />
                  {item.roleError && (
                    <p className="text-danger">{item.roleError}</p>
                  )}
                </Col>
                {index ? (
                  <Button
                    variant="none"
                    className="link-danger position-absolute top-1 mt-n1 end-2 w-8 p-0"
                    onClick={() => removeFormFields(index)}
                  >
                    <BsTrash className="text-xl" />
                  </Button>
                ) : (
                  ""
                )}
              </Row>
            </div>
          );
        })}
        <Button variant="neutral" className="" onClick={() => addFormFields()}>
          <span className="pe-3">+</span>
          {getLocalText("InviteMemberModal.add")}
        </Button>
      </Modal.Body>
      <Modal.Footer className="pt-0 border-top-0">
        <Button variant="neutral" className="mt-0" onClick={hide}>
          {getLocalText("Common.cancel")}
        </Button>
        <Button
          variant="primary"
          className="mt-0"
          onClick={handleInviteMemberModal}
        >
          {getLocalText("InviteMemberModal.invite")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default InviteMemberModal;
