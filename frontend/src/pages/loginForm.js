import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Image,
  Card,
  Form,
} from "react-bootstrap";
import { logo, moffice } from "../assets/images/index";

import { MdOutlineEmail } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import PhoneInput from "react-phone-input-2";
import axios from "axios";
import "react-phone-input-2/lib/style.css";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import Otp from "../components/Otp/Otp";
import { useNavigate } from "react-router-dom";
import { getLocalText } from "../localate/i18nextInit";
import { useMsal } from "@azure/msal-react";
import { getUserData } from "../redux/action/authaction";
import { useDispatch } from "react-redux";
import { loginVideo } from "../assets/video";

const LoginForm = () => {
  const { instance } = useMsal();
  const [validated, setValidated] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [sendOtp, setSendOtp] = useState(false);
  const [flag, setFlag] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailData, setEmailData] = useState(false);
  const [otp, setOtp] = useState("");
  const [country] = useState("ca");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEmail = () => {
    setValidated(false);
    setEmailData(!emailData);
  };

  const validateEmail = () => {
    const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    if (!emailAddress || !regEx.test(emailAddress)) {
      setValidated(true);
      setIsLoading(false);
      return false;
    } else {
      return true;
    }
  };

  const validateNumbrer = () => {
    const phoneValid = /^\+?\d{0,2}\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    if (!phoneValid.test(phoneNumber)) {
      setValidated(true);
      setIsLoading(false);
      return false;
    } else {
      return true;
    }
  };

  const emailLogin = async () => {
    if (validateEmail()) {
      setIsLoading(true);
      try {
        const data = await axios.post(
          `${process.env.REACT_APP_PUBLIC_URL}/auth/login-with-email`,
          {
            email: emailAddress,
          }
        );
        if (data.data?.status === 200) {
          data.data?.status === 200 ? setSendOtp(true) : setSendOtp(false);
        } else if (data.data?.status === 400) {
          if (data.data?.status === 400) {
            setValidated(true);
            setIsLoading(false);
          } else {
            setValidated(false);
          }
        }
        setFlag(false);
        setOtp(data.data?.otp);
        setIsLoading(false);
      } catch (error) {
        setValidated(true);
        setIsLoading(false);
        console.log("error", error);
      }
    } else {
      setValidated(true);
    }
  };

  const phoneNumberLogin = async () => {
    if (!phoneNumber) {
      setValidated(true);
      setIsLoading(false);
      return;
    }
    if (validateNumbrer()) {
      try {
        setIsLoading(true)
        const data = await axios.post(
          `${process.env.REACT_APP_PUBLIC_URL}/auth/login-with-number`,
          {
            number: "+" + phoneNumber,
          }
        );
        if (data.data?.status === 200) {
          data.data?.status === 200 ? setSendOtp(true) : setSendOtp(false);
        } else if (data.data?.status === 400) {
          if (data.data?.status === 400) {
            setValidated(true);
            setIsLoading(false);
          } else {
            setValidated(false);
          }
        }
        setFlag(true);
        setOtp(data.data?.otp);
        setIsLoading(false)
      } catch (error) {
        setValidated(true);
        setIsLoading(false)
        console.log("error", error);
      }
    }
  };

  const emailLoginVerify = async () => {
    if (otp) {
      try {
        const data = await axios.post(
          `${process.env.REACT_APP_PUBLIC_URL}/auth/email-login-verify`,
          {
            email: emailAddress,
            otp: otp,
          }
        );
        if (data?.status === 200) {
          localStorage.setItem("token", data.data.token);
          localStorage.setItem("isLogin", true);
          dispatch(getUserData());
          return navigate("/orders");
        } else {
          setValidated(true);
        }
        setValidated(false);
      } catch (error) {
        setValidated(true);
        return;
      }
    } else {
      setValidated(true);
    }
  };

  const numberLoginVerify = async () => {
    if (otp) {
      try {
        const data = await axios.post(
          `${process.env.REACT_APP_PUBLIC_URL}/auth/otp-verify`,
          {
            otp: otp,
            number: "+" + phoneNumber,
          }
        );
        if (data?.status === 200) {
          localStorage.setItem("token", data.data.token);
          localStorage.setItem("isLogin", true);
          dispatch(getUserData());
          return navigate("/orders");
        } else {
          setValidated(true);
        }
        setValidated(false);
      } catch (error) {
        setValidated(true);
        return;
      }
    } else {
      setValidated(true);
    }
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    emailAddress ? emailLogin() : phoneNumberLogin();
  };
  const handleEmailChange = (e) => {
    setEmailAddress(e.target.value);
    setValidated(false);
  };

  const loginAuthHandler = async (
    email,
    googleLogin = false,
    microsoftLogin = false
  ) => {
    let data;
    setIsLoading(true);
    if (emailAddress || phoneNumber) {
      emailAddress ? emailLoginVerify() : numberLoginVerify();
    }

    if (googleLogin || microsoftLogin) {
      data = await axios.post(
        `${process.env.REACT_APP_PUBLIC_URL}/auth/login-with-email`,
        {
          token: email,
        }
      );
      if (data?.status === 200) {
        data = await axios.post(
          `${process.env.REACT_APP_PUBLIC_URL}/auth/email-login-verify`,
          {
            token: email,
            otp: data.data.otp,
          }
        );

        localStorage.setItem("token", data.data.token);
        localStorage.setItem("isLogin", true);
        dispatch(getUserData());
        setIsLoading(false);
        return navigate("/orders");
      } else {
        setValidated(true);
        setIsLoading(false);
      }

      setValidated(false);
      return navigate("/orders");
    }
  };

  const microsoftLoginHandler = async () => {
    const loginRequest = {
      scopes: ["user.read"],
      prompt: "select_account",
    };

    try {
      const response = await instance.loginPopup(loginRequest);
      loginAuthHandler(response.idToken, false, true);
    } catch (error) {
      console.log("Login Failed");
    }
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    loginAuthHandler(process.env.REACT_APP_TOKEN);
  };

  return (
    <Container className="h-sm-screen gx-0" fluid>
      <Row className="h-sm-full gx-0">
        <Col xl={6} md={5} className="login-bg h-sm-full d-md-block d-none">
          <video autoPlay muted loop className="h-full object-cover w-full">
            <source src={loginVideo} />
          </video>
        </Col>
        <Col
          xl={6}
          md={7}
          className="vstack h-md-screen overflow-y-md-auto login"
        >
          <Card className="h-full border-0 rounded-0">
            <Card.Header className="hstack justify-content-between border-bottom-0 py-sm-10 py-6 px-lg-18 px-sm-10 px-4">
              <Image src={logo} className="w-sm-auto w-40" />
              <Button
                variant="neutral"
                size="sm"
                className="shadow-none text-roboto ms-auto font-semibold"
              >
                {getLocalText("LoginForm.schedule")}
              </Button>
            </Card.Header>
            <Card.Body className="py-sm-10 py-6 px-lg-18 px-sm-10 px-4">
              {!sendOtp ? (
                <div className="mx-auto root-login">
                  <h3 className="mb-3">{getLocalText("LoginForm.welcome")}</h3>
                  <p className="text-lg text-dark mb-12">
                    {getLocalText("LoginForm.letBuild")}
                  </p>
                  <Form validated={validated} onSubmit={loginHandler}>
                    {emailData ? (
                      <Form.Group
                        className="mb-1"
                        controlId="validationCustom03"
                      >
                        <Form.Control
                          className=" email-input"
                          type="email"
                          placeholder="Tapez votre e-mail"
                          value={emailAddress}
                          onChange={handleEmailChange}
                        />
                        <Form.Control.Feedback
                          className="font-bolder my-2 d-block"
                          type="invalid"
                        >
                          {validated &&
                            getLocalText("LoginForm.associatedEmail")}
                        </Form.Control.Feedback>
                      </Form.Group>
                    ) : (
                      <div className="country-select ">
                        <PhoneInput
                          className="shadow-none rounded-2 "
                          containerClass="input-group"
                          inputClass="form-control-lg rounded-2 ps-16 pe-0 border-0 bg-transparent"
                          buttonClass="start-2 top-2 bottom-2 border-0 overlap-10 bg-transparent rounded-5"
                          value={"ca"}
                          country={country}
                          dropdownClass="shadow-2 rounded-2"
                          placeholder={getLocalText("LoginForm.placeHolder")}
                          onChange={(e) => {
                            setPhoneNumber(e);
                            setValidated(false);
                          }}
                        />
                        <Form.Control.Feedback
                          className="font-bolder my-2 d-block"
                          type="invalid"
                        >
                          {validated &&
                            getLocalText("LoginForm.associatedPhone")}
                        </Form.Control.Feedback>
                      </div>
                    )}

                    <Form.Text className="d-block text-gray93 mb-6 mt-3">
                      {getLocalText("LoginForm.verification")}
                    </Form.Text>
                    {/* <Form.Text className="d-block text-muted"></Form.Text> */}
                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full mb-6"
                    >
                      {getLocalText(
                        isLoading ? "Loading..." : "LoginForm.connexion"
                      )}
                    </Button>
                    <div className="hstack mb-6">
                      <hr className="flex-1" />
                      <p
                        className="mx-3 text-dark-gray"
                        style={{ fontSize: "10px" }}
                      >
                        {getLocalText("LoginForm.throughOtherAccounts")}
                      </p>
                      <hr className="flex-1" />
                    </div>
                    <div className="hstack gap-4 justify-content-center flex-wrap">
                      <Button
                        variant="neutral"
                        className="btn-login border-0 position-relative px-7"
                        onClick={handleEmail}
                      >
                        <GoogleOAuthProvider
                          clientId={process.env.REACT_APP_GOOGLE_APP_ID}
                        >
                          <GoogleLogin
                            // type="icon"
                            size="large"
                            // shape="pill"
                            onSuccess={(credentialResponse) => {
                              loginAuthHandler(
                                credentialResponse.credential,
                                true
                              );
                            }}
                            onError={() => {
                              console.log("Login Failed");
                            }}
                          />
                        </GoogleOAuthProvider>
                        <FcGoogle className="position-absolute top-1/2 start-1/2 translate-middle text-xl" />
                      </Button>
                      <Button
                        variant="neutral"
                        className={`border-0 ${emailData ? "active" : ""}`}
                        onClick={handleEmail}
                      >
                        <MdOutlineEmail className="text-2xl text-blue" />
                      </Button>
                      <Button
                        variant="neutral"
                        className="border-0"
                        onClick={microsoftLoginHandler}
                      >
                        <Image src={moffice} className="h-5" />
                      </Button>
                    </div>
                  </Form>
                </div>
              ) : (
                <Otp
                  validated={validated}
                  handleSubmit={handleSubmit}
                  otp={otp}
                  setOtp={setOtp}
                  setValidated={setValidated}
                  phoneNumberLogin={phoneNumberLogin}
                  emailLogin={emailLogin}
                  flag={flag}
                />
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default LoginForm;
