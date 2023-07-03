import { React, useState } from "react";
import { Table, Image, Badge, Button } from "react-bootstrap";
import { avatar4 } from "../assets/images";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { member } from "./memberData";
import { EditMember, DeleteModal } from "./index";
import { getLocalText } from "../localate/i18nextInit";

function MemeberTable() {
  const [show, setShow] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const data = ["Common.name", "Common.email", "Common.role", "Common.status"];

  const handleShow = () => {
    setShow(!show);
  };

  const deleteModalShow = () => {
    setDeleteModal(!deleteModal);
  };

  return (
    <>
      <Table responsive>
        <thead>
          <tr className="table-light">
            {data.map((item, index) => (
              <th key={index}>{getLocalText(item)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {member.map((user, index) => {
            return (
              <tr key={index}>
                <td>
                  <Image src={avatar4} fluid />
                  <span className="text-dark ms-3">{user.name}</span>
                </td>
                <td>{user.email}</td>
                <td>
                  <Badge
                    bg={"soft-primary"}
                    className="text-primary font-regular text-uppercase rounded-pill"
                  >
                    {user.role}
                  </Badge>
                </td>
                <td>
                  <Badge
                    bg={"yellow-200"}
                    className="text-dark font-semibold rounded-pill"
                  >
                    {user.status}
                  </Badge>
                </td>
                <td className="text-end">
                  <Button
                    variant="neutral"
                    className="px-2 btn-sm me-2"
                    onClick={handleShow}
                  >
                    <FiEdit2 className="text-md text-gray-600" />
                  </Button>
                  <Button
                    variant="neutral"
                    className="px-2 btn-sm"
                    onClick={deleteModalShow}
                  >
                    <FiTrash2 className="text-md text-red-600" />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      {show && <EditMember show={show} hide={() => handleShow()} />}
      {deleteModal && (
        <DeleteModal show={deleteModal} hide={() => deleteModalShow()} />
      )}
    </>
  );
}
export default MemeberTable;
