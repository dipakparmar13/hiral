import { React, useState, useEffect } from "react";
import {
  Container,
  Tabs,
  Tab,
  Button,
  InputGroup,
  Form,
  Card,
  Row,
  Col,
} from "react-bootstrap";
import { ContactCard, DeleteModal, InvitationModal } from "../components";
import { BsSearch } from "react-icons/bs";
import { ComonLayout } from "./index";
import { getLocalText } from "../localate/i18nextInit";
import { useDispatch, useSelector } from "react-redux";
import { getAllCoustmerList } from "../redux/action/inviteaction";
import axios from "axios";
import { config } from "../redux/header";
const Contact = () => {
  const [show, setShow] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const { userList } = useSelector((state) => state.auth);
  const [searchCustomer, setSearchCustomer] = useState();
  const dispatch = useDispatch();
  const handleShow = () => {
    if (userList?.organization?._id === undefined) {
      setDeleteModal(true)
    } else {
      setShow(!show);
    }
  };

  const numbers = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  const { getAllCoustmer } = useSelector((state) => state.inviteAdd);
  const listItems = numbers.map((number, index) => (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a key={index} className="text-capitalize text-dark" href="#">
      {number}
    </a>
  ));

  const getAllCoustmerFilter = async () => {

    try {
      let apiUrl = `${process.env.REACT_APP_PUBLIC_URL}/invitation/get?status=1&`;
      if (searchCustomer !== "") {
        apiUrl += `search_name=${searchCustomer ? searchCustomer : ""}&`;
      }
      const filterResult = await axios.get(apiUrl, config());
      dispatch(getAllCoustmerList(filterResult.data.user));
    } catch (error) {
      console.log("err", error);
    }
  };

  useEffect(() => {
    getAllCoustmerFilter()
  }, [searchCustomer]);

  const handleSearch = (e) => {
    setSearchCustomer(e.target.value)
  }
  return (
    <>
      <ComonLayout>
        <Tabs
          defaultActiveKey="Clients"
          id="uncontrolled-tab-example"
          className="head-tab px-lg-6 px-3 mb-10"
        >
          <Tab eventKey="Clients" title="Clients">
            <Container fluid className="gx-lg-10">
              <div className="hstack mb-3">
                <h2 className="font-bold">{getLocalText("Contact.viewAll")}</h2>
                <Button
                  variant="primary"
                  className="ms-auto py-2 px-6 text-13"
                  onClick={handleShow}
                >
                  + {getLocalText("Common.invite")}
                </Button>
              </div>
              <Tabs
                defaultActiveKey="home"
                id="uncontrolled-tab-example"
                className="mb-5"
              >
                <Tab
                  eventKey="home"
                  title={getLocalText("Contact.viewAll")}
                ></Tab>
              </Tabs>
              <InputGroup
                className="mb-18"
                size="sm"
                style={{ maxWidth: "230px" }}
              >
                <Form.Control
                  onChange={handleSearch}
                  placeholder=""
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  className="border-0 ps-2"
                />
                <InputGroup.Text className="bg-light border-0 pe-2" id="basic-addon1">
                  <BsSearch className="text-dark text-base" onClick={getAllCoustmerFilter} />
                </InputGroup.Text>
              </InputGroup>
              <Card className="border-0">
                <Card.Body>
                  <Row>
                    <Col className="order-sm-1 order-2">
                      <Row className="gy-4 gx-4">

                        {getAllCoustmer?.map((item, index) => {
                          return (
                            <Col key={index} xl={4} md={6}>
                              <ContactCard item={item} />
                            </Col>
                          )
                        })}
                        {/* <Col xl={4} md={6}>
                          <ContactCard />
                        </Col>
                        <Col xl={4} md={6}>
                          <ContactCard />
                        </Col>
                        <Col xl={4} md={6}>
                          <ContactCard />
                        </Col>
                        <Col xl={4} md={6}>
                          <ContactCard />
                        </Col>
                        <Col xl={4} md={6}>
                          <ContactCard />
                        </Col>
                        <Col xl={4} md={6}> */}
                        {/* <ContactCard /> */}
                        {/* </Col> */}
                      </Row>
                    </Col>
                    <Col
                      sm="auto"
                      className="w-sm-10 text-center order-sm-2 order-1"
                    >
                      <div className="d-flex flex-sm-column flex-wrap gap-2">
                        {listItems}
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Container>
          </Tab>
        </Tabs >
      </ComonLayout >

      {show && <InvitationModal show={show} hide={() => handleShow()} />}
      {deleteModal && <DeleteModal show={deleteModal} hide={() => handleShow()} id={1} />}
    </>
  );
};
export default Contact;
