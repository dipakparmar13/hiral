import { React, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { DeleteModal } from "./index";
import { getLocalText } from "../localate/i18nextInit";

function DeleteAccount() {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(!show);
  };

  return (
    <>
      <Card>
        <Card.Body className="hstack flex-wrap flex-sm-nowrap gap-3">
          <div>
            <h6 className="font-bold text-bright-red mb-2">
              {getLocalText("DeleteAccount.deleteAccount")}
            </h6>
            <p className="text-base text-corn-blue text-roboto">
              {getLocalText("DeleteAccount.clickOnDeleteAccount")}
            </p>
          </div>
          <Button
            variant="bright-red"
            className="ms-sm-auto text-sm"
            onClick={handleShow}
          >
            {getLocalText("Common.delete")}
          </Button>
        </Card.Body>
      </Card>

      {show && <DeleteModal show={show} hide={() => handleShow()} />}
    </>
  );
}
export default DeleteAccount;
