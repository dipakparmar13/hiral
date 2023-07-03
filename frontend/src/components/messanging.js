import React from "react";
import { Image, Badge, Card } from "react-bootstrap";
import { addchat, avatar, broadcast } from "../assets/images/index";
import { FiUser } from "react-icons/fi";
import { MdNotificationsOff } from "react-icons/md";
import { BsSnow } from "react-icons/bs";
import { getLocalText } from "../localate/i18nextInit";

function Messaging() {
  return (
    <Card className="border-0 rounded-0 sidebar">
      <Card.Header className="hstack pt-7 pb-4 px-6">
        <h5>{getLocalText("Messaging.messaging")}</h5>
        <Image src={addchat} fluid className="ms-auto" />
      </Card.Header>
      <Card.Body
        className="px-6 overflow-y-auto h-xl-calc"
        style={{ "--x-h-xl": "71px" }}
      >
        <ul className="list-unstyled text-roboto">
          <li>
            <div className="hstack gap-4">
              <span
                className="msg-avtar flex-none"
                style={{
                  backgroundImage: "url(" + avatar + ")",
                }}
              ></span>
              <div className="flex-1 py-2 msg-content">
                <div className="hstack">
                  <h6 className="w-20 text-trunc">Subtitle 1</h6>
                  <span className="ms-auto text-base caption">Caption 2</span>
                </div>
                <p className="sidebar-text">
                  Body 3 Maecenas sed diam eget risus
                </p>
              </div>
            </div>
          </li>
          <li>
            <div className="hstack gap-4">
              <span className="msg-avtar flex-none">
                <FiUser className="text-light text-xl" />
              </span>
              <div className="flex-1 py-2 msg-content">
                <div className="hstack gap-1 mb-1">
                  <h6 className="text-trunc">Subtitle 1</h6>
                  <span className="font-bolder text-black opacity-50 ms-1 text-sm">
                    125
                  </span>
                  <MdNotificationsOff className="text-black opacity-40 ms-1" />
                  <span className="ms-auto text-base caption">Caption 2</span>
                </div>
                <div className="hstack">
                  <p className="sidebar-text">
                    Body 3 Maecenas sed diam eget risus
                  </p>
                  <Badge
                    bg="purple-600"
                    className="ms-auto rounded-circle py-1"
                  >
                    9
                  </Badge>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className="hstack gap-4">
              <span className="msg-avtar bg-green-700"></span>
              <div className="flex-1 py-2 msg-content">
                <div className="hstack mb-1">
                  <Image style={{ marginRight: "6px" }} src={broadcast} />
                  <h6 className="text-trunc">Neobox Support</h6>
                  <span className="font-bolder text-black opacity-50 text-sm ms-1">
                    125
                  </span>
                  <span className="ms-auto text-base caption">Caption 2</span>
                </div>
                <div className="hstack">
                  <p className="sidebar-text">
                    Body 3 Maecenas sed diam eget risus
                  </p>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className="hstack gap-4">
              <span className="msg-avtar flex-none">
                <FiUser className="text-light text-xl" />
              </span>
              <div className="flex-1 py-2 msg-content">
                <div className="hstack gap-1 mb-1">
                  <h6 className="text-trunc">Subtitle 1</h6>
                  <span className="font-bolder text-black opacity-50 text-sm ms-1">
                    125
                  </span>
                  <BsSnow className="text-purple-600 ms-1" />
                  <span className="ms-auto text-base caption">Caption 2</span>
                </div>
                <div className="hstack">
                  <p className="sidebar-text">
                    Body 3 Maecenas sed diam eget risus
                  </p>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className="hstack gap-4">
              <span className="msg-avtar flex-none">
                <FiUser className="text-light text-xl" />
              </span>
              <div className="flex-1 py-2 msg-content">
                <div className="hstack gap-1 mb-1">
                  <h6 className="text-trunc">Subtitle 1</h6>
                  <span className="font-bolder text-black opacity-50 text-sm ms-1">
                    125
                  </span>
                  <MdNotificationsOff className="text-black opacity-40 ms-1" />
                  <span className="ms-auto text-base caption">Caption 2</span>
                </div>
                <div className="hstack">
                  <p className="sidebar-text">
                    Body 3 Maecenas sed diam eget risus
                  </p>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className="hstack gap-4">
              <span className="msg-avtar flex-none">
                <FiUser className="text-light text-xl" />
              </span>
              <div className="flex-1 py-2 msg-content">
                <div className="hstack">
                  <h6 className="text-trunc">Subtitle 1</h6>
                  <span className="ms-auto text-base caption">Caption 2</span>
                </div>
                <p className="sidebar-text">
                  Body 3 Maecenas sed diam eget risus
                </p>
              </div>
            </div>
          </li>
          <li>
            <div className="hstack gap-4">
              <span className="msg-avtar flex-none">
                <FiUser className="text-light text-xl" />
              </span>
              <div className="flex-1 py-2 msg-content">
                <div className="hstack gap-1 mb-1">
                  <h6 className="text-trunc">Subtitle 1</h6>
                  <span className="font-bolder text-black opacity-50 ms-1 text-sm">
                    125
                  </span>
                  <MdNotificationsOff className="text-black opacity-40 ms-1" />
                  <span className="ms-auto text-base caption">Caption 2</span>
                </div>
                <div className="hstack">
                  <p className="sidebar-text">
                    Body 3 Maecenas sed diam eget risus
                  </p>
                  <Badge
                    bg="purple-600"
                    className="ms-auto rounded-circle py-1"
                  >
                    9
                  </Badge>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className="hstack gap-4">
              <span className="msg-avtar flex-none bg-green-700"></span>
              <div className="flex-1 py-2 msg-content">
                <div className="hstack gap-1 mb-1">
                  <Image src={broadcast} />
                  <h6 className="text-trunc">Subtitle 1</h6>
                  <span className="font-bolder text-black opacity-50 text-sm ms-1">
                    125
                  </span>
                  <span className="ms-auto text-base caption">Caption 2</span>
                </div>
                <div className="hstack">
                  <p className="sidebar-text">
                    Body 3 Maecenas sed diam eget risus
                  </p>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </Card.Body>
    </Card>
  );
}
export default Messaging;
