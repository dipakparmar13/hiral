import { React, useState } from "react";
import { Button, Modal, Row, Col, Badge, Form } from "react-bootstrap";
import { FiEdit2 } from "react-icons/fi";
import { getLocalText } from "../localate/i18nextInit";
import { toast } from "react-toastify";
import ToastMessage from "./toast";
import { useDispatch } from "react-redux";
import axios from "axios";
import { config } from "../redux/header";
import { getCoustmer } from "../redux/action/inviteaction";

function EditModal({ hide, show, userData, allcoustmer }) {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [defaultValue] = useState({
    accountNumber: "",
    company: "",
    phoneNumber: "",
    typeOfOrganization: allcoustmer?.item?.organization_type,
    address: "",
  });
  const [inpval, setInpval] = useState(defaultValue);
  const handleEditModal = async () => {
    if (inpval.typeOfOrganization !== allcoustmer?.item?.organization_type) {
      try {
        await axios.patch(
          `${process.env.REACT_APP_PUBLIC_URL}/invitation/update-organization`,
          {
            id: allcoustmer?.item?._id,
            organization_type: inpval.typeOfOrganization,
          },
          config()
        );
        dispatch(getCoustmer());
        hide();
        toast(<ToastMessage />);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  const selectcafeteria = (e) => {
    const typeOfOrganization = e.target.value;
    setInpval({ ...inpval, typeOfOrganization });
    setErrors({ ...errors, typeOfOrganization: null });
  };
  return (
    <Modal size="lg" show={show} onHide={hide} centered className="edit-modal">
      <Modal.Header closeButton className="border-bottom-0">
        <FiEdit2 className="text-gray-600 me-2" />
        <h5 className="font-semibold">{getLocalText("Common.editCustomer")}</h5>
      </Modal.Header>
      <Modal.Body>
        <Row className="gy-6">
          <Col lg={4}>
            <div className="hstack gap-5 mb-3">
              <div className="avatar avatar-lg bg-info rounded-circle border-secondary border border-2"></div>
              <div className="flex-1">
                <h5 className="mb-2 font-semibold">
                  {userData.first_name} {userData.last_name}
                </h5>
                <p className="text-gray-600 text-sm">
                  <Badge bg="soft-warning" className="text-dark-orange me-2">
                    {allcoustmer?.item?.organization_type}
                  </Badge>
                  {userData.address}
                </p>
              </div>
            </div>
          </Col>
          <Col lg={4}>
            <Form.Group>
              <Form.Label>
                {getLocalText("EditModal.accountNumbers")}
              </Form.Label>
              <Form.Control
                disabled={true}
                name="accountNumber"
                value={allcoustmer.item?.customer_account}
                type="number"
                placeholder="0486678998"
                className="ps-4"
              />
            </Form.Group>
          </Col>
          <Col lg={4}>
            <Form.Group>
              <Form.Label>
                {getLocalText("Common.typeOfOrganization")}
              </Form.Label>
              <Form.Select
                defaultValue={allcoustmer?.item?.organization_type}
                value={inpval.typeOfOrganization}
                aria-label="Default select example"
                onChange={(e) => selectcafeteria(e)}
              >
                <option value="restaurant">restaurant</option>
                <option value="epiceries">epiceries</option>
                <option value="hôpitaux">hôpitaux</option>
                <option value="entreprise">entreprise</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col lg={4}>
            <Form.Group>
              <Form.Label>{getLocalText("EditModal.business")} </Form.Label>
              <Form.Control
                disabled={true}
                name="company"
                value={userData.first_name}
                type="text"
                placeholder="Bonnie Green INC"
                className="ps-4"
              />
            </Form.Group>
          </Col>
          <Col lg={4}>
            <Form.Group>
              <Form.Label>{getLocalText("EditModal.phoneNumber")}</Form.Label>
              <Form.Control
                disabled={true}
                name="phoneNumber"
                value={userData.number}
                type="number"
                placeholder={userData.number}
                className="ps-4 input"
              />
            </Form.Group>
          </Col>
          <Col lg={4}>
            <Form.Group>
              <Form.Label> {getLocalText("EditModal.address")} </Form.Label>
              <Form.Control
                disabled={true}
                name="address"
                value={userData.address}
                type="text"
                placeholder="343 rue labelle montr"
                className="ps-4"
              />
            </Form.Group>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer className="border-top-0 pt-0">
        <Button onClick={handleEditModal} className="py-2 px-3 font-semibold">
          {getLocalText("Common.saveChanges")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditModal;
