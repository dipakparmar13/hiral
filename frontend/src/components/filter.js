import React, { useEffect, useState } from "react";
import {
  InputGroup,
  Form,
  Dropdown,
  Button,
  Row,
  Col,
  Nav,
  Tab,
} from "react-bootstrap";
import { BsSearch, BsCalendarEvent } from "react-icons/bs";
import { getLocalText } from "../localate/i18nextInit";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { orderData } from "../redux/action/orderaction";
import axios from "axios";
import moment from "moment";
import { config } from "../redux/header";

function Filter() {
  const dispatch = useDispatch();
  const [orderSearchName, setOrderSearchName] = useState("");
  const [status, setStatus] = useState([]);
  const [show, setShow] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [buttonArray, setbuttonArray] = useState([
    { text: "Filter.nowadays", selected: false },
    { text: "Filter.yesterday", selected: false },
    { text: "Filter.thisWeek", selected: false },
  ]);

  const data = ["see_everything", "confirm", "onHold", "cancel", "close"];

  const handleCheck = (e) => {
    var isExistStatus = status.includes(e.target.value);
    var statusUpdateData = isExistStatus
      ? status.filter((d) => d !== e.target.value)
      : [...status, e.target.value];
    setStatus(statusUpdateData);
  };
  const handleSearch = (e) => {
    setOrderSearchName(e.target.value);
  };

  const handleFilter = async () => {
    const statusName = status.join(",");
    try {
      let apiUrl = `${process.env.REACT_APP_PUBLIC_URL}/order/get-filter-wise?page=1&`;

      if (orderSearchName !== "") {
        apiUrl += `search_name=${orderSearchName ? orderSearchName : ""}&`;
      }
      if (buttonArray[0].selected) {
        apiUrl += `start_date=${moment().startOf("day").toISOString()}&`;
        apiUrl += `end_date=${moment().endOf("day").toISOString()}&`;
      } else if (buttonArray[1].selected) {
        apiUrl += `start_date=${moment()
          .subtract(1, "days")
          .startOf("day")
          .toISOString()}&`;
        apiUrl += `end_date=${moment()
          .subtract(1, "days")
          .endOf("day")
          .toISOString()}&`;
      } else if (buttonArray[2].selected) {
        apiUrl += `start_date=${moment()
          .subtract(7, "days")
          .startOf("day")
          .toISOString()}&`;
        apiUrl += `end_date=${moment().endOf("day").toISOString()}&`;
      }
      if (startDate && endDate) {
        apiUrl += `start_date=${startDate}&`;
        apiUrl += `end_date=${endDate}&`;
      }
      if (status) {
        apiUrl += `order_status=${statusName}&`;
      }

      const filterResult = await axios.get(apiUrl, config());
      dispatch(orderData(filterResult.data.results));
      setShow(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  const changeEndDate = (date) => {
    if (date > startDate) {
      setEndDate(date);
    } else {
      setEndDate(null);
    }
  };
  const handleButtonState = (index) => {
    let temp = buttonArray;
    temp = temp.map((val, ind) => {
      if (ind === index) {
        val.selected = !val.selected;
      } else if (index) {
        val.selected = false;
      } else {
        val.selected = false;
      }
      return val;
    });
    setbuttonArray([...temp]);
    handleFilter();
  };

  useEffect(() => {
    handleFilter();
  }, [orderSearchName]);

  return (
    <>
      <div className="hstack mb-10 gap-4 flex-wrap">
        <InputGroup
          className="shadow-none"
          size="sm"
          style={{ maxWidth: "210px" }}
        >
          <Form.Control
            onChange={handleSearch}
            placeholder=""
            aria-label="Username"
            aria-describedby="basic-addon1"
            className="border-0 ps-2"
          />
          <InputGroup.Text className="bg-light border-0 pe-2" id="basic-addon1">
            <BsSearch className="text-dark text-base" onClick={handleFilter} />
          </InputGroup.Text>
        </InputGroup>
        <Dropdown
          className="filter-drop"
          autoClose="outside"
          show={show}
          onToggle={() => {
            setShow(!show);
          }}
        >
          <Dropdown.Toggle
            className="font-bold px-3 py-2 bg-light"
            id="dropdown-autoclose-inside"
            variant="neutral"
          >
            <span>{getLocalText("Status.dateFilters")}</span>
            <span className="vr opacity-20 mx-3"></span>
            <span className="text-primary">{new Date().getFullYear()}</span>
          </Dropdown.Toggle>

          <Dropdown.Menu className="px-3">
            <Dropdown.Item
              href="#"
              className="text-muted text-base font-semibold px-0 pb-5"
            >
              {getLocalText("Status.dateFilters")}
            </Dropdown.Item>
            {data.map((item, index) => {
              return (
                <Form.Check className="mb-5" type={"checkbox"} key={index}>
                  <Form.Check.Input
                    value={item}
                    name="status"
                    type={"checkbox"}
                    onChange={handleCheck}
                    id={`check${index}`}
                    className="me-3"
                  />
                  <Form.Check.Label
                    className="text-corn-blue text-base text-roboto lh-normal"
                    htmlFor={`check${index}`}
                  >
                    {getLocalText(`Status.${item}`)}
                  </Form.Check.Label>
                </Form.Check>
              );
            })}
            <Dropdown.Item
              href="#"
              className="text-muted text-base font-semibold px-0 pt-0 pb-5"
            >
              {getLocalText("Filter.custom")}
            </Dropdown.Item>
            <Row className="gx-3 mb-5">
              <Col xs="6">
                <Form.Group className="hstack gap-2">
                  <Form.Label className="mb-0 w-5 flex-none text-center">
                    <BsCalendarEvent className="text-lg text-a6" />
                  </Form.Label>
                  <DatePicker
                    className="px-3 form-control text-sm text-blue-magenta text-roboto"
                    placeholderText={getLocalText("Filter.startDate")}
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                  />
                </Form.Group>
              </Col>
              <Col xs="6">
                <Form.Group className="hstack gap-2">
                  <Form.Label className="mb-0 text-corn-blue text-base w-5 flex-none text-center">
                    {getLocalText("Filter.to")}
                  </Form.Label>
                  <DatePicker
                    className="px-3 form-control text-sm text-blue-magenta text-roboto"
                    placeholderText={getLocalText("Filter.endDate")}
                    selected={endDate}
                    onChange={(date) => changeEndDate(date)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button
              variant="primary"
              className="w-full mb-2"
              id="outside"
              onClick={() => {
                handleFilter();
              }}
            >
              {getLocalText("Filter.apply")}
            </Button>
          </Dropdown.Menu>
        </Dropdown>
        <Tab.Container id="left-tabs-example">
          <Row className="ms-md-auto">
            <Col sm={12}>
              <Nav variant="neutral" className="day-filter">
                {buttonArray.map((item, index) => {
                  return (
                    <Nav.Item key={index.toString()}>
                      <Nav.Link className="p-0"
                        active={item.selected} >
                        <Button
                          variant="neutral"
                          className="text-sm"                      
                          onClick={() => {
                            handleButtonState(index);
                          }}
                        >
                          {getLocalText(item.text)}
                        </Button>
                      </Nav.Link>
                    </Nav.Item>
                  );
                })}
              </Nav>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </>
  );
}
export default Filter;
