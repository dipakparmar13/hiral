import { React, useState } from "react";
import { Card, Badge, Button } from "react-bootstrap";
import { FiEdit2 } from "react-icons/fi";
import { BiTrash } from "react-icons/bi";
import { DeleteModal, EditModal } from "./index";
import { ToastContainer } from "react-toastify";

function ContactCard(data) {
  const [userData, setUserData] = useState()
  const [show, setShow] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const handleShow = (item) => {
    setShow(!show);
    setUserData(item)
  };

  const deleteModalShow = () => {
    setDeleteModal(!deleteModal);
  };

  return (
    <>
      <Card className="border-0 shadow-d">
        {data.item?.user?.map((item, index) => {
          return (
            <>
              <Card.Body className="hstack w-full gap-3">
                {item.profile_image ? (
                  <img
                    className="avatar avatar-lg x"
                    src={item.profile_image}
                    alt=""
                  />
                ) : (
                  <span className="avatar avatar-lg bg-green-500 rounded-circle border-secondary border border-2"></span>
                )}
                <div className="flex-1">
                  <div className="hstack gap-5 mb-3">
                    <h5 className="font-semibold">
                      {item.first_name} {item.last_name}
                    </h5>
                    <Button
                      className="ms-auto bg-transparent p-0 border-0 shadow-none"
                      onClick={() => handleShow(item)}
                    >
                      <FiEdit2 className="text-lg text-gray-600" />
                    </Button>
                    <Button
                      className="bg-transparent p-0 border-0 shadow-none"
                      onClick={deleteModalShow}
                    >
                      <BiTrash className="text-lg text-bright-red" />
                    </Button>
                  </div>
                  <div>
                    <Badge
                      bg="soft-warning"
                      className="text-dark-orange font-semibold me-2"
                    >
                      {data.item.organization_type
                        ? data.item.organization_type
                        : "--"}
                    </Badge>
                    <span className="text-gray-600 text-sm">
                      {item.address}
                    </span>
                  </div>
                </div>
              </Card.Body>
            </>
          );
        })}
      </Card>
      <ToastContainer
        style={{ width: "450px", marginTop: "135px" }}
        closeButton={false}
        hideProgressBar={true}
        autoClose={1000}
      />

      {show && <EditModal show={show} hide={() => handleShow()} userData={userData} allcoustmer = {data} />}
      {deleteModal && (
        <DeleteModal
          show={deleteModal}
          hide={() => deleteModalShow()}
          id={0}
          contactId={data?.item?._id}
        />
      )}
    </>
  );
}
export default ContactCard;
