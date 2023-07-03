import React, { useState } from "react";
import { Row, Col, Form, Image} from "react-bootstrap";
import { moffice } from "../assets/images";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

function Account() {
    const [value, setValue] = useState()
    return (
      <>
        <Row className="my-auto">
          <Col lg={6} className="mx-auto col-11">
            <h1 className="mb-2">Créer votre compte</h1>
            <p className="text-md text-dark mb-10">C'est gratuit et facile</p>
            <Form>
              <Form.Group className="mb-6" controlId="formBasicEmail">
                <Form.Label className="text-42 font-semibold text-base">
                  Votre prénom
                </Form.Label>
                <Form.Control type="email" placeholder="Entrez votre prénom" />
              </Form.Group>
              <Form.Group className="mb-6" controlId="formBasicEmail">
                <Form.Label className="text-42 font-semibold text-base">
                  Votre nom de famille
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Entrez votre nom de famille"
                />
              </Form.Group>
              <div className="input-group flex-nowrap mb-6 shadow-none ">
                <PhoneInput
                  placeholder="Numéro de téléphone mobile"
                  className=""
                  country={"us"}
                  value={value}
                  onChange={setValue}
                />
              </div>
              <Form.Check className="mb-6" type={"checkbox"} id={"checkbox"}>
                <Form.Check.Input className="w-5 h-5" type={"checkbox"} />
                <Form.Check.Label className="text-42 ms-2 text-sm">
                  En créant un compte,{" "}
                  <span className="font-bolder">
                    vous acceptez les conditions générales
                  </span>{" "}
                  et notre{" "}
                  <span className="font-bolder">
                    politique de confidentialité.
                  </span>
                </Form.Check.Label>
              </Form.Check>
              <a className="btn btn-primary w-full mb-6" href="/orders">
                Enregistrez vous
              </a>
              <div className="hstack mb-6">
                <hr className="flex-1" />
                <p className="text-sm mx-3">ou le faire via d'autres comptes</p>
                <hr className="flex-1" />
              </div>
              <div className="hstack gap-4 justify-content-center flex-wrap">
                <a
                  className="w-16 h-14 hstack justify-content-center shadow-1 rounded-2"
                  href="/"
                >
                  <FcGoogle className="text-2xl" />
                </a>
                <a
                  className="w-16 h-14 hstack justify-content-center shadow-1 rounded-2"
                  href="/"
                >
                  <Image src={moffice} />
                </a>
                <a
                  className="w-16 h-14 hstack justify-content-center shadow-1 rounded-2"
                  href="/"
                >
                  <FaFacebookF className="text-2xl text-blue" />
                </a>
              </div>
            </Form>
          </Col>
        </Row>
      </>
    );
}
export default Account;