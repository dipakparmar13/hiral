import React from "react";
import { Container, Tabs, Tab, Row, Col } from "react-bootstrap";
import {
  Profile,
  DeleteAccount,
  OrganizationCard,
  AddressCard,
  Management,
  Memeber,
} from "../components";
import { ComonLayout } from "./index";
import { ToastContainer } from "react-toastify";
import { getLocalText } from "../localate/i18nextInit";

const Setting = () => {
  return (
    <>
      <ToastContainer
        className="toastContainer"
        closeButton={false}
        hideProgressBar={true}
        autoClose={1000}
      />
      <ComonLayout>
        <Tabs
          defaultActiveKey="home"
          id="uncontrolled-tab-example"
          className="head-tab px-lg-4 px-3"
        >
          <Tab eventKey="home" title={getLocalText("Header.profile")}>
            <div className="mt-10">
              <Row className="gx-0">
                <Col lg={10} className="mx-auto">
                  <Profile />
                </Col>
              </Row>
            </div>
            <Container fluid className="mt-lg-32 mt-16">
              <Row className="gx-0">
                <Col lg={10} className="mx-auto">
                  <DeleteAccount />
                </Col>
              </Row>
            </Container>
          </Tab>
          <Tab
            eventKey="organisation"
            title={getLocalText("Header.organization")}
          >
            <div className="mt-10">
              <Row className="gx-0">
                <Col lg={10} className="mx-auto mb-6">
                  <div className="mb-10">
                    <OrganizationCard />
                  </div>
                  <AddressCard />
                </Col>
              </Row>
            </div>
          </Tab>
          <Tab eventKey="permission" title="Permission">
            <div className="mt-10">
              <Row className="gx-0">
                <Col lg={10} className="mx-auto">
                  <div className="mb-10 ">
                    <Management />
                  </div>
                  <Memeber />
                </Col>
              </Row>
            </div>
          </Tab>
        </Tabs>
      </ComonLayout>
    </>
  );
};
export default Setting;
