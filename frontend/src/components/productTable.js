import React, { useEffect, useState } from "react";
import { Col, Image, Row, Table } from "react-bootstrap";
import { getLocalText } from "../localate/i18nextInit";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductData } from "../redux/action/productaction";
import PaginationPage from "./pagination";

function ProductTable() {
  var [active, setActive] = useState(1);
  const dispatch = useDispatch();
  const data = [
    "ProductTable.image",
    "ProductTable.productID",
    "Common.name",
    "ProductTable.description",
    "ProductTable.categories",
    "ProductTable.unit",
    "ProductTable.startingPrice",
  ];
  const { getAllProduct } = useSelector((state) => state.productData);
  const totalPage = getAllProduct.results?.totalPages;
  const currentPage = getAllProduct.results?.currentPage;

  useEffect(() => {
    dispatch(getAllProductData(active));
  }, [active, dispatch]);

  return (
    <>
      <Table responsive className="table-data">
        <thead className="table-light">
          <tr>
            {data.map((item, index) => {
              return (
                <th
                  key={index}
                  className="text-uppercase shadow-inset-1 border-0"
                >
                  {getLocalText(item)}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="font-semibold text-roboto">
          {getAllProduct?.results?.products?.map((item, index) => {
            return (
              <tr key={index}>
                <td>
                  <Image
                    className="avatar avatar-sm rounded-2 bg-zumthor me-3"
                    src={item.image}
                    fluid
                  />
                </td>
                <td>{item.product_id?.substring(1)}</td>
                <td>{item.name}</td>
                <td className="text-dark">
                  <span className="text-truncate w-40 d-block">
                    {item.discript}
                  </span>
                </td>
                <td className="text-dark">{item.category_id?.name}</td>
                <td>{item.unit} </td>
                <td>{item.price}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Row className=" mt-5">
        <Col className="hstack">
          <p className="px-6 text-dark-gray text-sm">
            {`${getAllProduct?.results?.products?.length}  ${getLocalText(
              "Common.elements"
            )} sur ${getAllProduct?.results?.totalProducts}  ${getLocalText(
              "Common.results"
            )}`}
          </p>
        </Col>
        <Col className="hstack justify-content-end">
          {getAllProduct?.results?.products?.length ? (
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
}
export default ProductTable;
