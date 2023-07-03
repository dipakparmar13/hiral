import React from "react";
import { Container, Card, Tabs, Tab } from "react-bootstrap";
import { Filter, DataTable } from "../components";
import { getLocalText } from "../localate/i18nextInit";
import { ComonLayout } from "./index";

const Layout = () => {
  return (
    <>
      <ComonLayout>
        <Tabs
          defaultActiveKey="home"
          id="uncontrolled-tab-example"
          className="head-tab px-lg-6 px-3 mb-16"
        >
          <Tab eventKey="home" title={getLocalText("Common.order")}>
            <Container fluid className="gx-lg-10">
              <Filter />
              <Card className="rounded-4 shadow-b">
                <Card.Body className="text-dark font-bold border-bottom px-0">
                  <span className="px-5 pb-5">
                    {getLocalText("Common.order")}
                  </span>
                  <DataTable />
                </Card.Body>
              </Card>
            </Container>
          </Tab>
        </Tabs>
      </ComonLayout>
    </>
  );
};
export default Layout;
