import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { MemberCard } from "./index";
import { getLocalText } from "../localate/i18nextInit";

function Management() {
  const data = [
    "Common.admin",
    "Common.manager",
    "Common.employee"
  ]
  return (
    <>
      <Card className="shadow-c">
        <Card.Body>
          <h6 className="text-dark font-regular mb-2 text-15">
            {getLocalText("Management.roleManagement")}
          </h6>
          <p className="mb-6 text-roboto font-light">
            {getLocalText("Management.manageYourAccount")}
          </p>
          <Row className="gy-10 gx-lg-10">
            {data.map((item, index) => {
              return (
                <Col key={index} lg={4} md={6}>
                  <MemberCard item={item} />
                </Col>
              );
            })}
            {/* <Col lg={4} md={6}>
              <MemberCard />
            </Col>
            <Col lg={4} md={6}>
              <MemberCard />
            </Col> */}
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}
export default Management;
