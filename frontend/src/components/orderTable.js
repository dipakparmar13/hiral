import React from "react";
import { Table, Image } from "react-bootstrap";
import { product4 } from "../assets/images";
import { getLocalText } from "../localate/i18nextInit";
import { useSelector } from "react-redux";

function OrderTable() {
  const { getOrderDetails } = useSelector((state) => state.orderData);

  const data = [
    "OrderTable.image",
    "Common.articles",
    "OrderTable.quantity",
    "OrderTable.unitPrice",
  ];

  return (
    <>
      <div className="bg-light rounded-4 pb-3 px-5">
        <p className="font-semibold py-6 text-dark-black">
          Numéro de commande : {getOrderDetails?.order?.order_number}
        </p>
        <Table responsive>
          <thead>
            <tr>
              {data.map((item, index) => {
                return (
                  <th
                    key={index}
                    className="font-bold text-capitalize text-gray-500 shadow-inset-1"
                  >
                    {getLocalText(item)}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {getOrderDetails?.order?.product?.map((item, index) => {
              return (
                <tr key={index} className="font-semibold">
                  <td>
                    <Image src={product4} className="object-cover" />
                  </td>
                  <td>{item.product_name}</td>
                  <td className="w-20 text-center">{item.product_quantity}</td>
                  <td className="w-20">₦{item.product_price}.00</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
}
export default OrderTable;
