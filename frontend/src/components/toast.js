import React from "react";
import { Col, Row, Toast } from "react-bootstrap";
import { getLocalText } from "../localate/i18nextInit";
import { BsCheckLg } from "react-icons/bs";

function ToastMessage() {
  return (
    <Toast>
      <Row>
        <Col>
          <Row>
            <Col xs="auto" className="hstack">
              <span className="hstack justify-content-center h-14 w-14 rounded-pill bg-green">
                <BsCheckLg className="text-white text-xl" />
              </span>
            </Col>
            <Col>
              <h6 className="mb-1 font-semibold">
                {getLocalText("Common.savesuccessfully")}
              </h6>
              <p>{getLocalText("Common.everything")}</p>
            </Col>
          </Row>
        </Col>
        <Col
          xs="auto"
          className="pe-0 border-start w-24 flex-none d-flex align-items-end justify-content-center"
        >
          <span className="w-full mt-auto text-center text-a6 font-bold">
            <p>{getLocalText("Common.close")}</p>
          </span>
        </Col>
      </Row>
    </Toast>
  );
}

export default ToastMessage;
