import React, { useEffect } from "react";
import { Container, Row, Col, Tabs, Tab } from "react-bootstrap";
import { OrderTable, Overview, Detail, OrderTracking } from "../components";
import { getLocalText } from "../localate/i18nextInit";
import { ComonLayout } from "./index";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrder } from "../redux/action/orderaction";

const ReadMore = () => {
  let dispatch = useDispatch();
  const parmas = useParams();

  useEffect(() => {
    dispatch(getOrder(parmas.id));
  }, [dispatch, parmas]);
  return (
    <>
      <ComonLayout>
        <Tabs
          defaultActiveKey="home"
          id="uncontrolled-tab-example"
          className="head-tab px-lg-6 px-3 mb-7"
        >
          <Tab eventKey="home" title={getLocalText("Common.order")}>
            <Container fluid className="gx-lg-10">
              <Row className="gy-10">
                <Col xl={7}>
                  <OrderTable />
                </Col>
                <Col xl={4} className="ms-auto">
                  <div className="mb-10">
                    <Overview />
                  </div>
                  <div className="mb-10">
                    <Detail />
                  </div>
                  <OrderTracking />
                </Col>
              </Row>
            </Container>
          </Tab>
        </Tabs>
      </ComonLayout>
    </>
  );
};
export default ReadMore;
