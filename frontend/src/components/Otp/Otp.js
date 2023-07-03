import React from "react";
import { Button, Form } from "react-bootstrap";
import OTPInput from "react-otp-input";
import { Link } from "react-router-dom";
import { getLocalText } from "../../localate/i18nextInit"; 

const Otp = ({
  validated,
  handleSubmit,
  otp,
  setOtp,
  readOtp,
  setValidated,
  phoneNumberLogin,
  emailLogin,
  flag
}) => {
  return (
    <div className="mx-auto" style={{ maxWidth: "424px" }}>
      <h3 className="mb-2 text-center">{getLocalText("Otp.confirmation")}</h3>
      <p
        className="text-sm font-semibold text-center mb-10"
        style={{ color: "#7A7E80" }}
      >
        {getLocalText("Otp.registration")}
      </p>

      <Form validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-5">
          <OTPInput
            value={otp}
            onChange={(e) => {
              setOtp(e);
              setValidated(false);
            }}
            containerStyle="d-flex justify-content-center gap-2"
            inputStyle="form-control text-40 font-bold w-16 px-4 otp-input"
            numInputs={5}
            renderInput={(props) => <input {...props} />}
            shouldAutoFocus
            hasErrored={validated}
          />
          {validated && (
            <Form.Control.Feedback
              className="d-block text-center text-base font-bolder mt-4"
              type="invalid"
            >
              {getLocalText("Otp.invalid")}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <p className="font-bold text-center mb-10" style={{ color: "#7A7A9D" }}>
          {getLocalText("Otp.receive")}
          <Link onClick={ flag ? phoneNumberLogin : emailLogin} className="link-primary ps-1">
            {getLocalText("Otp.resend")}
          </Link>
        </p>
        <Button type="submit" variant="primary" className="w-full">
          {getLocalText("Otp.confirm")}
        </Button>
        <h1 className="text-danger text-center">{readOtp}</h1>
      </Form>
    </div>
  );
};

export default Otp;
