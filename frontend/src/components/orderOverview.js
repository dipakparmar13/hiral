import React from "react";
import { Button, Card } from "react-bootstrap";
import { getLocalText } from "../localate/i18nextInit";
import { useSelector } from "react-redux";

function Overview() {
  const { getOrderDetails } = useSelector((state) => state.orderData);

  return (
    <>
      <Card className="rounded-4">
        <Card.Body>
          <div className="hstack gap-2">
            <p className="text-md font-semibold text-dark">
              {getLocalText("Overview.orderOverview")}
            </p>
            <Button variant="outline-bright-red" className="ms-auto px-8">
              {getLocalText("Common.cancel")}
            </Button>
          </div>
          <hr></hr>
          <div className="hstack gap-2 mb-3">
            <p className="text-md text-dark font-bold text-dark">
              {getLocalText("Overview.total")}
            </p>
            <p className="ms-auto text-dark">
              ${getOrderDetails?.order?.total_price}.00
            </p>
          </div>
          <div className="hstack gap-2">
            <p className="text-md text-dark font-bold text-dark">
              {getLocalText("Overview.subtotal")}
            </p>
            <p className="ms-auto text-dark">
              ${getOrderDetails?.order?.total_price}.00
            </p>
          </div>
          <hr></hr>
          <div className="hstack gap-2">
            <p className="text-xl text-dark font-bolder text-dark">
              {getLocalText("Overview.subtotal")}
            </p>
            <p className="text-xl font-bolder ms-auto text-dark">
              ${getOrderDetails?.order?.total_price}.00
            </p>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
export default Overview;
