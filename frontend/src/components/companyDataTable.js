import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Image, Button, Row, Col } from "react-bootstrap";
import { bonnielogo } from "../assets/images";
import { GoDotFill } from "react-icons/go";
import { getLocalText } from "../localate/i18nextInit";
import { useDispatch, useSelector } from "react-redux";
import { getOrder, getOrderList } from "../redux/action/orderaction";
import moment from "moment";
import PaginationPage from "./pagination";

const DataTable = () => {
  const navigate = useNavigate();
  let [active, setActive] = useState(1);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderList(active));
  }, [active, dispatch]);

  const orderlist = useSelector((state) => state.orderData);
  const totalPage = orderlist.orderItems?.totalPages;
  const currentPage = orderlist.orderItems?.currentPage;

  const data = [
    "DataTable.company",
    "DataTable.orderDate",
    "DataTable.amount",
    "DataTable.deliveryDate",
    "Common.status",
  ];

  const handleSubmit = (itemId) => {
    dispatch(getOrder(itemId));
    navigate(`/order/${itemId}`);
  };
  useEffect(() => {
    dispatch(getOrderList());
  }, [dispatch]);
  return (
    <>
      <Table responsive className="table-data mt-5">
        <thead className="table-light">
          <tr>
            {data.map((item, index) => {
              return (
                <th key={index} className="border-0 shadow-inset-1">
                  {getLocalText(item)}
                </th>
              );
            })}
            <th className="border-0 shadow-inset-1"></th>
          </tr>
        </thead>
        <tbody>
          {orderlist.orderItems?.orders?.map((item, index) => {
            return (
              <tr key={index}>
                <td className="text-dark font-bold">
                  <Image src={bonnielogo} className="me-2" fluid />
                  {item.order_name}
                </td>
                <td>{moment(item.order_at).format("DD/MM/YYYY-hh:mma")}</td>
                <td>${item.total_price}</td>
                <td>{moment(item.created_at).format("DD/MM/YYYY-hh:mma")}</td>
                <td>
                  <div className="hstack">
                    {item.order_status ? (
                      <GoDotFill
                        className={`text-lg  me-2 ${
                          item.order_status === "cancel"
                            ? "text-danger"
                            : item.order_status === "confirm"
                            ? "text-success"
                            : item.order_status === "close"
                            ? "text-secondary"
                            : item.order_status === "onHold"
                            ? "text-warning"
                            : ""
                        } `}
                      />
                    ) : (
                      ""
                    )}
                    {item.order_status
                      ? getLocalText(`Status.${item.order_status}`)
                      : "--"}
                  </div>
                </td>
                <td>
                  <Button
                    variant="neutral"
                    className="btn-sm px-4 py-2 font-bold"
                    onClick={() => handleSubmit(item._id)}
                  >
                    Voir détail
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Row className="mt-5 gy-4">
        <Col sm={6} className="hstack">
          <p className="px-5 font-regular text-dark-gray text-sm">
            {`${orderlist?.orderItems?.orders?.length || 0}  ${getLocalText(
              "Common.articles"
            )} sur ${orderlist?.orderItems?.totalOrders}  ${getLocalText(
              "Common.results"
            )}`}
          </p>
        </Col>
        <Col sm={6} className="hstack justify-content-end">
          {orderlist.orderItems?.orders ? (
            <PaginationPage
              active={active}
              totalPage={totalPage}
              currentPage={currentPage}
              setActive={setActive}
            />
          ) : (
            ""
          )}
        </Col>
      </Row>
    </>
  );
};
export default DataTable;
