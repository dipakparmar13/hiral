import { React } from "react";
import { Button, Modal, Image } from "react-bootstrap";
import { BsPeople } from "react-icons/bs";
import { avatar } from "../assets/images";
import { getLocalText } from "../localate/i18nextInit";

function AddMemberModal({ hide, show }) {
  return (
    <Modal show={show} onHide={hide} centered>
      <Modal.Header className="hstack gap-3 px-0 mx-5 justify-content-start">
        <span
          className="avatar w-16 h-16 "
          style={{ backgroundColor: "#F1E4F7" }}
        >
          <BsPeople className="text-dark text-xl" />
        </span>
        <div>
          <h5 className="mb-2">{(getLocalText("AddMemberModal.addMembers"))}</h5>
          <p className="text-sm">
            {(getLocalText("AddMemberModal.selectCurrent"))}
          </p>
        </div>
      </Modal.Header>
      <Modal.Body className="scrollable-y py-0" style={{ maxHeight: "425px" }}>
        <div className="list-group list-group-flush">
          <div className="list-group-item d-flex align-items-center gap-4 px-0 py-3">
            <div className="avatar avatar-sm rounded-circle">
              <Image src={avatar}></Image>
            </div>
            <div className="flex-fill">
              <h6>Jadwiga Kulinska</h6>
            </div>
            <Button variant="neutral" className="btn-sm font-bold">
              Ajouter
            </Button>
          </div>
          <div className="list-group-item d-flex align-items-center gap-4 px-0 py-3">
            <div className="avatar avatar-sm rounded-circle">
              <Image src={avatar}></Image>
            </div>
            <div className="flex-fill">
              <h6>Alexis Enache</h6>
            </div>
            <Button variant="neutral" className="btn-sm font-bold">
              Ajouter
            </Button>
          </div>
          <div className="list-group-item d-flex align-items-center gap-4 px-0 py-3">
            <div className="avatar avatar-sm rounded-circle bg-primary text-light">
              <span className="text-base font-semibold">MJ</span>
            </div>
            <div className="flex-fill">
              <h6>Magdalena Jablonka</h6>
            </div>
            <Button variant="neutral" className="btn-sm font-bold">
              Ajouter
            </Button>
          </div>
          <div className="list-group-item d-flex align-items-center gap-4 px-0 py-3">
            <div className="avatar avatar-sm rounded-circle">
              <Image src={avatar}></Image>
            </div>
            <div className="flex-fill">
              <h6>Heather Wright</h6>
            </div>
            <Button variant="neutral" className="btn-sm font-bold">
              Ajouter
            </Button>
          </div>
          <div className="list-group-item d-flex align-items-center gap-4 px-0 py-3">
            <div className="avatar avatar-sm rounded-circle bg-pink-300 text-light">
              <span className="text-base font-semibold">CJ</span>
            </div>
            <div className="flex-fill">
              <h6>Christ Jonathan</h6>
            </div>
            <Button variant="neutral" className="btn-sm font-bold">
              Ajouter
            </Button>
          </div>
          <div className="list-group-item d-flex align-items-center gap-4 px-0 py-3">
            <div className="avatar avatar-sm rounded-circle bg-pink-300 text-light">
              <span className="text-base font-semibold">CJ</span>
            </div>
            <div className="flex-fill">
              <h6>Christ Jonathan</h6>
            </div>
            <Button variant="neutral" className="btn-sm font-bold">
              Ajouter
            </Button>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="px-0 mx-5">
        <Button variant="neutral" className="font-bold" onClick={hide}>
          {(getLocalText("Common.close"))}

        </Button>
        <Button className="py-2 px-3" onClick={hide}>{(getLocalText("AddMemberModal.inviteUsers"))}</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddMemberModal;
