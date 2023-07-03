import React from "react";
import { Badge, Image, Form, Card, Button } from "react-bootstrap";
import { FiUser } from "react-icons/fi";
import { RiCheckDoubleFill, RiAddBoxLine } from "react-icons/ri";
import { avatar5, chatimg, chatimg2 } from "../assets/images";
import { getLocalText } from "../localate/i18nextInit";

function Chat() {
  return (
    <>
      <Card className="border-0 sidebar rounded-0">
        <Card.Header className="hstack pt-4 pb-4 px-6">
          <div className="avatar avatar-sm rounded-circle bg-dark-gray me-2">
            <FiUser className="text-light text-lg" />
          </div>
          <h5 className="font-bolder">{getLocalText("Chat.restaurant")}</h5>
        </Card.Header>
        <Card.Body
          className="px-6 overflow-y-auto h-xl-calc"
          style={{ "--x-h-xl": "170px" }}
        >
          <ul className="list-unstyled chat-list chat text-roboto">
            <li className="text-center">
              <Badge bg="dark-300" className="mb-5 rounded-pill text-sm">
                {getLocalText("Chat.date")}
              </Badge>
              <p className="text-dark opacity-50">
                Jane Doe {getLocalText("Chat.joinMessage")}
              </p>
            </li>
            <li className="">
              <div className="d-flex align-items-end gap-2">
                <span className="avatar avatar-sm rounded-circle">
                  <Image src={avatar5} />
                </span>
                <div>
                  <h6 className="text-sm font-bolder text-black opacity-50">
                    Caption 1
                  </h6>
                  <div className="bg-light-red2 py-2 px-3 chat-box rounded-4 text-dark">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </div>
                </div>
                <p className="text-xs text-dark-300">Caption 4</p>
              </div>
            </li>
            <li className="text-end chat-right">
              <div className="d-flex align-items-end gap-2">
                <RiCheckDoubleFill className="chat-check active text-lg" />
                <p className="text-xs text-dark-300">Caption 4</p>
                <div>
                  <div className="bg-user py-2 px-3 chat-box rounded-4">
                    Single line message
                  </div>
                </div>
              </div>
            </li>
            <li className="">
              <div className="d-flex align-items-end gap-2">
                <span className="avatar avatar-sm rounded-circle">
                  <Image src={avatar5} />
                </span>
                <div>
                  <h6 className="text-sm font-bolder text-black opacity-50">
                    Caption 1
                  </h6>
                  <div className="chat-box rounded-4 text-dark">
                    <Image src={chatimg} fluid />
                  </div>
                </div>
                <p className="text-xs text-dark-300">Caption 4</p>
              </div>
            </li>
            <li className="text-end chat-right">
              <div className="d-flex align-items-end gap-2">
                <RiCheckDoubleFill className="chat-check active text-lg" />
                <p className="text-xs text-dark-300">Caption 4</p>
                <div>
                  <div className="bg-user py-2 px-3 chat-box rounded-4">
                    Single line message
                  </div>
                </div>
              </div>
            </li>
            <li className="">
              <div className="d-flex align-items-end gap-2">
                <span className="avatar avatar-sm rounded-circle">
                  <Image src={avatar5} />
                </span>
                <div>
                  <h6 className="text-sm font-bolder text-black opacity-50">
                    Caption 1
                  </h6>
                  <div className="chat-box rounded-4 text-dark">
                    <Image src={chatimg} fluid />
                  </div>
                </div>
                <p className="text-xs text-dark-300">Caption 4</p>
              </div>
            </li>
            <li className="text-end chat-right">
              <div className="d-flex align-items-end gap-2">
                <RiCheckDoubleFill className="chat-check active text-lg" />
                <p className="text-xs text-dark-300">Caption 4</p>
                <div>
                  <div className="bg-user py-2 px-3 chat-box rounded-4">
                    Single line message
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="d-flex align-items-end gap-2">
                <span className="avatar avatar-sm rounded-circle">
                  <Image src={avatar5} />
                </span>
                <div>
                  <div className="chat-box rounded-4 text-dark">
                    <Card className="bg-light-red2">
                      <Card.Title className="py-2 px-3 mb-0">
                        Card Title
                      </Card.Title>
                      <Card.Img className="rounded-0" src={chatimg2} />
                      <Card.Body className="px-3 py-2">
                        <Card.Text>
                          Fraise d’hiver fraichement cultivé
                        </Card.Text>
                        <h6 className="text-sm">Total : 12,000.12 $</h6>
                      </Card.Body>
                    </Card>
                  </div>
                </div>
                <p className="text-xs text-dark-300">Caption 4</p>
              </div>
            </li>
          </ul>
        </Card.Body>
        <Card.Footer className="hstack gap-3 border-top-0 text-roboto">
          <Button variant="none" className="p-0">
            <RiAddBoxLine className="text-xl text-purple-600" />
          </Button>
          <Form.Control
            className="rounded-10"
            style={{ backgroundColor: "#EEEEEE" }}
            type="email"
            placeholder={getLocalText("Chat.chatPlaceholder")}
          />
        </Card.Footer>
      </Card>
    </>
  );
}
export default Chat;
