import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Messaging, SideBar, Chat } from "../components";

const Message = () => {
  return (
    <>
      <div className="d-lg-flex bg-gray-100">
        <SideBar />
        <div className="vstack h-screen overflow-y-auto">
          <Container fluid>
            <Row className="gx-0 gy-xl-0 gy-6">
              <Col xl="auto" className="w-xl-96 pe-xl-3">
                <Messaging />
              </Col>
              <Col>
                <Chat />
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};
export default Message;
