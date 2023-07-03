import React, { useEffect, useState } from "react";
import { Badge, Container, Dropdown, Image } from "react-bootstrap";
import { avatar } from "../assets/images/index";
import { BsPerson, BsGearWideConnected, BsBoxArrowLeft } from "react-icons/bs";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { getLocalText } from "../localate/i18nextInit";
import { headerData } from "./headerData";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../redux/action/authaction";
import { useMsal } from "@azure/msal-react";

function Header() {
  const [header, setHeader] = useState();
  const { instance } = useMsal();
  const { userList } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const logoutHandler = () => {
    localStorage.clear();
    instance.logoutRedirect();
    sessionStorage.clear();
    navigate("/login");
    window.location.href = process.env.REACT_APP_REDIRECT_URL;
  };
  useEffect(() => {
    let temp;
    // eslint-disable-next-line array-callback-return
    headerData.map((item) => {
      if (item.asUrl === location.pathname) {
        temp = item.transition;
      }
      setHeader(temp);
    });
    dispatch(getUserData());
  }, [location, dispatch]);


  return (
    <>
      <div className="bg-light pt-8">
        <Container fluid className="gx-lg-10">
          <div className="hstack">
            <h2 className="font-bold text-2xl">
              {getLocalText(
                `HeaderData.${header === undefined ? "tableaubord" : header}`
              )}
            </h2>
            <Dropdown className="ms-auto">
              <Dropdown.Toggle
                variant="light"
                className="bg-transparent border-0 drop-gray shadow-none p-0 position-realtive"
              >
                {userList?.user?.profile_image ? (
                  <Image
                    className="avatar avatar-sm rounded-circle bg-zumthor me-3"
                    src={`${process.env.REACT_APP_PUBLIC_URL}/auth/get/${userList?.user?.profile_image}`}
                    fluid
                  />
                ) : (
                  <Image
                    className="avatar avatar-sm rounded-circle bg-zumthor me-3"
                    src={avatar}
                    fluid
                  />
                )}

                <Badge
                  bg="success"
                  className="p-0 w-4 h-4 rounded-circle border border-3 border-light position-absolute top-1 start-7"
                >
                  <span></span>
                </Badge>
              </Dropdown.Toggle>
              <Dropdown.Menu className="shadow-1" align="end">
                <NavLink
                  to="/contact"
                  className="text-gray-700 text-base font-semibold dropdown-item"
                >
                  <BsPerson className="text-md me-2" />
                  {getLocalText("Header.profile")}
                </NavLink>
                <NavLink
                  to="/setting"
                  className="text-gray-700 text-base font-semibold dropdown-item"
                >
                  <BsGearWideConnected className="text-md me-2" />
                  {getLocalText("Header.settings")}
                </NavLink>
                <NavLink
                  to="/"
                  onClick={logoutHandler}
                  className="text-gray-700 text-base font-semibold dropdown-item"
                >
                  <BsBoxArrowLeft className="text-md me-2" />
                  {getLocalText("Header.logout")}
                </NavLink>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Container>
      </div>
    </>
  );
}
export default Header;
