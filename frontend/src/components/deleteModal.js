import { React } from "react";
import { Button, Modal } from "react-bootstrap";
import { BsFillExclamationCircleFill } from "react-icons/bs";
import { getLocalText } from "../localate/i18nextInit";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { config } from "../redux/header";
import { useDispatch } from "react-redux";
import { getCoustmer } from "../redux/action/inviteaction";

function DeleteModal({ hide, show, id = 0, contactId }) {
  // if id = 1 when organization data is null
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <Modal
      show={show}
      onHide={hide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="text-center"
    >
      <Modal.Header className="border-bottom-0 pb-0 justify-content-center">
        <Modal.Title className="">
          <BsFillExclamationCircleFill className="text-bright-red h-16 w-auto" />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {id === 1 ? (
          <>
            <h4 className="text-dark font-bold mb-2">
              {getLocalText("Common.orderToInvite")}
            </h4>
          </>
        ) : (
          <>
            <h6 className="text-dark font-bold mb-2">
              {getLocalText("DeleteModal.deleteSure")}
            </h6>
            <p className="text-corn-blue text-base mb-10 text-roboto">
              {getLocalText("DeleteModal.deleteAllAccess")}
            </p>
          </>
        )}
        <Button
          variant="bright-red"
          className="text-sm"
          onClick={
            id === 1
              ? () => navigate("/setting")
              : async () => {
                  try {
                    await axios.delete(
                      `${process.env.REACT_APP_PUBLIC_URL}/invitation/delete/${contactId}`,
                      config()
                    );
                    dispatch(getCoustmer());
                  } catch (error) {
                    console.error("Error:", error);
                  }
                }
          }
        >
          {id === 1 ? getLocalText("Common.ok") : getLocalText("Common.delete")}
        </Button>
      </Modal.Body>
    </Modal>
  );
}

export default DeleteModal;
