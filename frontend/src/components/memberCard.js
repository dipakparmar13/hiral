import { React, useState } from "react";
import { Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { avatar3, avatar4 } from "../assets/images";
import { AddMemberModal } from "./index";
import { getLocalText } from "../localate/i18nextInit";

function MemberCard(data) {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(!show);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <div className="hstack gap-1 flex-wrap mb-10">
            <p>5 {getLocalText("Common.members")} </p>
            <Link className="avatar-group ms-auto" onClick={handleShow}>
              <span className="avatar avatar-sm rounded-circle bg-zumthor text-primary">
                <Image src={avatar3} fluid />
              </span>
              <span className="avatar avatar-sm rounded-circle bg-zumthor text-primary">
                <Image src={avatar4} fluid />
              </span>
              <span className="avatar avatar-sm border border-2 border-light rounded-circle bg-secondary text-muted text-xs">
                +3
              </span>
            </Link>
          </div>
          <h6 className="font-light text-17 mb-3">
            {" "}
            {getLocalText(data.item)}
          </h6>
          <a className="link-primary text-13" href="/">
            {getLocalText("MemberCard.editMembers")} -{">"}
          </a>
        </Card.Body>
      </Card>

      {show && <AddMemberModal show={show} hide={() => handleShow()} />}
    </>
  );
}
export default MemberCard;
