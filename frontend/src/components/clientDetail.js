import React from "react";
import { Card, Image } from "react-bootstrap";
import { BsFillTelephoneFill } from "react-icons/bs";
import { glyph } from "../assets/images";
import { getLocalText } from "../localate/i18nextInit";
import { useSelector } from "react-redux";

function Detail() {
  const { getOrderDetails } = useSelector((state) => state.orderData);
  return (
    <>
      <Card className="rounded-4">
        <Card.Body className="text-dark">
          <p className="text-md font-bold text-dark mb-4">
            {getLocalText("Detail.customerDetails")}
          </p>
          <div className="bg-light-red py-4 px-5 rounded-4">
            <p className="text-md font-bold text-dark mb-3">
              {getOrderDetails?.order?.buyer_id?.first_name}{" "}
              {getOrderDetails?.order?.buyer_id?.last_name}
            </p>
            <p className="mb-4">
              <span className="text-md font-bolder me-4">@</span>
              {getOrderDetails?.order?.buyer_id?.email === ""
                ? "--"
                : getOrderDetails?.order?.buyer_id?.email}
            </p>
            <p className="mb-4">
              <BsFillTelephoneFill className="text-lg font-bold me-4" />
              {getOrderDetails?.order?.buyer_id?.number}
            </p>
            <p className="mb-4">
              <Image src={glyph} className="w-4 me-4" />
              {getOrderDetails?.order?.buyer_id?.address}
            </p>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
export default Detail;
