import React, { useState } from "react";
import { Container, Card, Tabs, Tab, Button } from "react-bootstrap";
import { TfiExport } from "react-icons/tfi";
import { ToastContainer } from "react-toastify";
import { ProductTable, AddProductModel } from "../components";
import { ComonLayout } from "./index";
import { getLocalText } from "../localate/i18nextInit";

const Catalogue = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(!show);
  };

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
          defaultActiveKey="Liste produit"
          id="uncontrolled-tab-example"
          className="head-tab px-lg-6 px-3 mb-10"
        >
          <Tab eventKey="Liste produit" title="Liste produit">
            <Container fluid className="gx-lg-10">
              <Card className="rounded-4">
                <Card.Body className="px-0">
                  <Card.Title className="text-md ps-4 d-flex">
                    <p>{getLocalText("Catalogue.products")}</p>
                    <Button
                      className=" -btn-btn-secondary ms-auto me-4  "
                      onClick={handleShow}
                    >
                      <TfiExport className="me-2 font-bold mt-n1 text-base" />
                      {getLocalText("ProductModal.AddProduct")}
                    </Button>
                  </Card.Title>
                  <ProductTable />
                </Card.Body>
              </Card>
            </Container>
          </Tab>
        </Tabs>
      </ComonLayout>
      {show && <AddProductModel show={show} hide={() => handleShow()} />}
    </>
  );
};
export default Catalogue;
