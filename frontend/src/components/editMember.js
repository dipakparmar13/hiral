import { React, useState } from "react";
import { Button, Modal, Row, Col, Badge, Form } from "react-bootstrap";
import { FiEdit2 } from "react-icons/fi";
// import { BiLockAlt } from "react-icons/bi";
import Select from "react-select";
import { getLocalText } from "../localate/i18nextInit";
import { validateEditMember } from "./validation";
// import { BsCheckLg } from "react-icons/bs";
import { toast } from "react-toastify";
import ToastMessage from "./toast";

const options = [
  { value: "admin", label: (getLocalText("Common.admin")) },
  { value: "admin.facturation", label: (getLocalText("Common.manager")) },
  { value: "membre", label: (getLocalText("Common.employee")) },
];
function EditMember({ hide, show }) {
  const [defaultValue] = useState({
    name: "Jack",
    email: "robert.fox@example.com",
    role: "admin",
  })
  const [inpval, setInpval] = useState(defaultValue);
  const [errors, setErrors] = useState({});
  const onchangehandle = (e) => {
    setInpval({ ...inpval, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null });
  }
  const selectlanguage = (name) => {
    const role = name.value;
    setInpval({ ...inpval, role });
    setErrors({ ...errors, role: null });
  };
  const handleEditMember = async () => {
    let formErrors = validateEditMember(inpval);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    }
    if (inpval !== defaultValue && Object.keys(formErrors).length < 1) {
      toast(<ToastMessage />)
      hide()
    }
  };
  return (
    <Modal
      size="lg"
      show={show}
      onHide={hide}
      centered
      className="edit-modal"
    >
      <Modal.Header closeButton className="border-bottom-0">
        <FiEdit2 className="text-lg text-gray-600 me-2" />
        <h5 className="font-semibold">{(getLocalText("Common.editCustomer"))}</h5>
      </Modal.Header>
      <Modal.Body>
        <Row className="gy-6">
          <Col lg={12}>
            <div className="hstack gap-5 mb-3">
              <div className="avatar avatar-lg bg-info rounded-circle border-secondary border border-2"></div>
              <div className="flex-1">
                <h5 className="mb-2">Artic Coffee</h5>
                <p className="text-gray-600 text-sm">
                  <Badge bg="soft-warning" className="text-dark-orange me-2">
                    Cafeteria
                  </Badge>
                  Québec, CA
                </p>
              </div>
            </div>
          </Col>
          <Col lg={4}>
            <Form.Group>
              <Form.Label>{(getLocalText("Common.name"))} </Form.Label>
              <Form.Control
                type="text"
                disabled={true}
                value={inpval.name}
                placeholder={(getLocalText("EditMember.bonnie"))}
                className="ps-4 py-4"
                name="name"
                onChange={(e) => onchangehandle(e)}
              />
              <p className="text-danger">{errors.name}</p>
            </Form.Group>
          </Col>
          <Col lg={4}>
            <Form.Group>
              <Form.Label>{(getLocalText("Common.email"))} </Form.Label>
              <Form.Control
                type="email"
                disabled={true}
                value={inpval.email}
                placeholder={(getLocalText("EditMember.placeHolder"))}
                className="ps-4 pe-8 py-4"
                name="email"
                onChange={(e) => onchangehandle(e)}
              />
              <p className="text-danger">{errors.email}</p>
            </Form.Group>
          </Col>
          <Col lg={4}>
            <Form.Group>
              <Form.Label>{(getLocalText("EditMember.roleType"))}</Form.Label>
              <Select
                options={options}
                defaultValue={{ value: "admin", label: "Admin" }}
                onChange={(e) => selectlanguage(e)}
                placeholder={"Admin"}
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
                className="mb-10"
              />
              <p className="text-danger" style={{ marginTop: "-35px" }}>{errors.role}</p>
            </Form.Group>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer className="border-top-0 pt-0">
        <Button onClick={handleEditMember} className="py-2 px-3 font-semibold">{(getLocalText("Common.saveChanges"))}</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditMember;
