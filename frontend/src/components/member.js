import { React, useState } from "react";
import { Button, Card, ButtonGroup } from "react-bootstrap";
import { InviteMemberModal, MemeberTable } from "./index";
import { getLocalText } from "../localate/i18nextInit";

function Memeber() {
  const [show, setShow] = useState(false);
  const data = [
    "Common.admin",
    "Common.manager",
    "Common.employee",
  ];

  const handleShow = () => {
    setShow(!show);
  };
  return (
    <>
      <Card className="shadow-c">
        <Card.Body className="px-0">
          <div className="hstack px-5">
            <h5 className="text-dark mb-2 text-15  ">
              {getLocalText("Common.members")}
            </h5>
            <Button className="ms-auto" onClick={handleShow}>
              {getLocalText("Memeber.invite")}
            </Button>
          </div>
          <hr></hr>
          <div className="scrollable-x px-5">
            <ButtonGroup className="w-full">
              <Button variant="neutral" className="text-primary font-semibold">
                {getLocalText("Memeber.viewAll")}
              </Button>
              {data.map((item, index) => (
                <Button key={index} variant="neutral" className="font-semibold">
                  {getLocalText(item)}
                  <span className="text-corn-blue text-sm font-regular ps-2">
                    (5)
                  </span>
                </Button>
              ))}
            </ButtonGroup>
          </div>
          <hr></hr>
          <MemeberTable />
          <p className="px-6 pt-5 text-dark-gray text-13">
            {`10 ${getLocalText("Common.articles")} 250 ${getLocalText(
              "Common.results"
            )}`}
          </p>
        </Card.Body>
      </Card>

      {show && <InviteMemberModal show={show} hide={() => handleShow()} />}
    </>
  );
}
export default Memeber;
