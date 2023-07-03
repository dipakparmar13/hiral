import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { getLocalText } from "../localate/i18nextInit";
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { config } from "../redux/header";
import { getOrder } from "../redux/action/orderaction";
import { useParams } from "react-router-dom";

function OrderTracking() {
  const { getOrderDetails } = useSelector((state) => state.orderData);
  const parmas = useParams();

  const dispatch = useDispatch();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isClose, setIsClose] = useState(false);
  const handleConfirmOrder = async () => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_PUBLIC_URL}/order/update`,
        {
          order_id: getOrderDetails?.order?._id,
          order_status: "confirm",
        },
        config()
      );

      if (response.status === 200) {
        setIsConfirmed(true);
        dispatch(getOrder());
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    getOrderDetails?.order?.order_status === "confirm"
      ? setIsConfirmed(true)
      : setIsConfirmed(false);
    dispatch(getOrder(parmas.id));
  }, [dispatch, isConfirmed, getOrderDetails?.order?.order_status, parmas]);

  return (
    <>
      <Card className="rounded-4">
        <Card.Body className="text-dark pb-0">
          <p className="text-md font-bold text-dark">
            {getLocalText("OrderTracking.orderTracking")}
          </p>
          <hr></hr>
          <Row>
            <Col xs="6">
              <Timeline
                className="p-0 mb-0"
                sx={{
                  [`& .${timelineItemClasses.root}:before`]: {
                    flex: 0,
                    padding: 0,
                  },
                }}
              >
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot
                      variant={isConfirmed ? "filled" : "outlined"}
                      className={`w-4 h-4 ${isConfirmed ? "text-success" : ""}`}
                      color={isConfirmed ? "success" : undefined}
                      sx={{ bgcolor: isConfirmed ? "#27AE60" : undefined }}
                    ></TimelineDot>
                    <TimelineConnector sx={{ bgcolor: "#D3D3D3" }} />
                  </TimelineSeparator>
                  <TimelineContent>
                    {getLocalText("OrderTracking.confirm")}
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot
                      variant={isClose ? "filled" : "outlined"}
                      className={`w-4 h-4 ${isClose ? "text-primary" : ""}`}
                      color={isClose ? "warning" : undefined}
                      sx={{ bgcolor: isClose ? "#27AE60" : undefined }}
                    />
                  </TimelineSeparator>
                  <TimelineContent>
                    {getLocalText("Common.close")}
                  </TimelineContent>
                </TimelineItem>
              </Timeline>
            </Col>
            <Col xs="6" className="text-end">
              <Button
                variant="outline-bright-red"
                className="p-1 text-sm font-bold ms-auto"
                disabled={
                  getOrderDetails?.order?.order_status === "confirm"
                    ? true
                    : false
                }
                onClick={handleConfirmOrder}
              >
                {getLocalText("OrderTracking.confirmed")}
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}
export default OrderTracking;
