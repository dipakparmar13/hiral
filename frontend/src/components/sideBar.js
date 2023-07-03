import React, { useEffect } from "react";
import { Navbar, Container, Nav, Image } from "react-bootstrap";
import { MdDashboard } from "react-icons/md";
import { BsChatLeftText, BsBook, BsPersonPlus } from "react-icons/bs";
import { logogreen } from "../assets/images";
import { NavLink } from "react-router-dom";
import { getLocalText } from "../localate/i18nextInit";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../redux/action/authaction";

function SideBar() {
  const { userList } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);
  return (
    <>
      <Navbar
        className="navbar-vertical px-lg-3 px-0"
        collapseOnSelect
        expand="lg"
        bg="light"
        variant="light"
      >
        <Container fluid>
          <Navbar.Brand className="text-wrap">
            <NavLink to="/catalogue">
              <div className="hstack align-items-start">
                {userList?.organization?.logo ? (
                  <img
                    className="img-fluid mx-2 h-full w-14"
                    src={`${process.env.REACT_APP_PUBLIC_URL}/organization/get/${userList?.organization?.logo}`}
                    alt=""
                  />
                ) : (
                  <Image src={logogreen} className="w-14" fluid />
                )}
                <div className="flex-1 ms-1">
                  <div>
                    <span className="text-nero text-18 font-semibold">
                      {userList?.organization?.name
                        ? userList?.organization?.name
                        : "Bonnie Green"}
                    </span>
                    <p className="text-gray77 text-12 ">
                      {userList?.organization?.address
                        ? userList?.organization?.address
                        : "San Barnardino, Ca"}
                    </p>
                  </div>
                </div>
              </div>
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="">
              <h6 className="text-uppercase text-gray96 text-inter nav-head text-sm font-bolder ps-5">
                {getLocalText("SideBar.menuPrincipal")}
              </h6>
              <NavLink to="/orders" className="nav-link text-base">
                <MdDashboard className="text-xl me-2 " />
                {getLocalText("Common.order")}
              </NavLink>
              <NavLink to="/message" className="nav-link text-base">
                <BsChatLeftText className="text-xl mt-1 me-2" />
                {getLocalText("SideBar.message")}
                <span className="badge bg-zumthor text-primary mt-1 ms-auto rounded-pill">
                  6
                </span>
              </NavLink>
              <NavLink to="/catalogue" className="nav-link text-base">
                <BsBook className="text-xl me-2" />
                {getLocalText("SideBar.catalogue")}
              </NavLink>
              <NavLink to="/contact" className="nav-link text-base">
                <BsPersonPlus className="text-xl me-2" />
                {getLocalText("SideBar.contacts")}
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
export default SideBar;
