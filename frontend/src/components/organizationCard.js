import React, { useEffect, useState } from "react";
import { Button, Card, Form, Image } from "react-bootstrap";
import { getLocalText } from "../localate/i18nextInit";
import { useDispatch, useSelector } from "react-redux";
import { addOrganization } from "../redux/action/organization";
import ToastMessage from "./toast";
import { toast } from "react-toastify";
import axios from "axios";
import { getUserData } from "../redux/action/authaction";
import { config } from "../redux/header";

function OrganizationCard() {
  const hiddenFileInput = React.useRef(null);
  const [inpval, setInpval] = useState();
  const [edit, setEdit] = useState(false);
  const { userList } = useSelector((state) => state.auth);
  const [errors, setErrors] = useState({});
  const value = false;

  const dispatch = useDispatch();
  const [imgs, setImgs] = useState("");
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleChange = (name, value) => {
    const fileUploaded = value[0];
    if (value.length !== 0) {
      const objectUrl = URL.createObjectURL(fileUploaded);
      setImgs(objectUrl);
      setInpval({ ...inpval, [name]: value });
      setEdit(true);
    }
  };
  const getdata = (name, value) => {
    setInpval({ ...inpval, [name]: value });
    setErrors({ ...errors, [name]: null });
    setEdit(true);
  };

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);
  useEffect(() => {
    setInpval(userList?.organization);
    setImgs(
      userList?.organization?.logo
        ? `${process.env.REACT_APP_PUBLIC_URL}/organization/get/${userList?.organization?.logo}`
        : ""
    );
  }, [userList?.organization, dispatch]);

  const handleSubmit = async () => {
    if (
      userList?.organization?.name &&
      JSON.stringify(inpval) !== JSON.stringify(userList?.organization)
    ) {
      var formData = new FormData();
      formData.append("id", inpval?._id);
      formData.append(
        "logo",
        JSON.stringify(inpval.logo) ===
          JSON.stringify(userList?.organization?.logo) &&
          JSON.stringify(inpval.name) !==
            JSON.stringify(userList?.organization?.name)
          ? inpval?.logo
          : inpval?.logo[0]
      );
      formData.append("name", inpval?.name);
      try {
        await axios.patch(
          `${process.env.REACT_APP_PUBLIC_URL}/organization/`,
          formData,
          config()
        );
        dispatch(getUserData());
        toast(<ToastMessage />);
      } catch (error) {
        console.log(error);
      }
    } else if (!userList?.organization?.name) {
      dispatch(addOrganization(inpval, value));
      toast(<ToastMessage />);
    }
  };
  const handleDelete = async () => {
    if (imgs) {
      try {
        const data = await axios.delete(
          `${process.env.REACT_APP_PUBLIC_URL}/organization/logo/delete?id=${userList?.organization?._id}`,
          config()
        );

        if (data.status === 200) {
          setImgs("");
        }
        dispatch(getUserData());
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  return (
    <>
      <Card className="shadow-c">
        <Card.Body>
          <h5 className="text-dark font-regular mb-2">
            {getLocalText("OrganizationCard.organization")}
          </h5>
          <p className="mb-6 text-roboto">
            {getLocalText("OrganizationCard.visibleName")}
          </p>
          <p className="text-dark mb-2">
            {getLocalText("OrganizationCard.logo")}
          </p>
          <div className="hstack gap-3 mb-6">
            {imgs ? (
              <Image
                src={imgs}
                className="avatar-lg rounded-circle img-fluid"
                style={{ width: "48px", height: "48px" }}
              />
            ) : (
              <span className="avatar avatar-lg bg-dark-orange rounded-circle"></span>
            )}
            <Button
              variant="neutral"
              type="file"
              onClick={handleClick}
              className="px-2 font-bold"
            >
              {getLocalText("OrganizationCard.download")}
            </Button>
            <input
              accept="image/*"
              type="file"
              name="logo"
              ref={hiddenFileInput}
              onChange={(e) => handleChange("logo", e.target.files)}
              style={{ display: "none" }}
            />
            <Button
              variant="neutral"
              className="text-bright-red font-bold"
              onClick={() => {
                setImgs("");
                setEdit(false);
                handleDelete();
              }}
            >
              {getLocalText("Common.delete")}
            </Button>
          </div>
          <Form.Label className="text-dark">
            {getLocalText("OrganizationCard.organization")}
          </Form.Label>
          <Form.Control
            value={inpval?.name ? inpval?.name : ""}
            type="text"
            name="name"
            placeholder="Placeholder"
            onChange={(e) => getdata("name", e.target.value)}
            className=""
          />
          <p className="text-danger ">{errors.name} </p>
          {edit && (
            <div className="d-flex justify-content-lg-end mt-8">
              <Button
                variant="neutral"
                className="font-bold me-3 text-sm"
                onClick={() => setEdit(false)}
              >
                {getLocalText("Common.cancel")}
              </Button>
              <Button
                variant="primary"
                className="bg-indigo-500 border-indigo-500 px-2 font-bold text-sm"
                onClick={handleSubmit}
              >
                {userList?.organization?.name
                  ? getLocalText("Common.update")
                  : getLocalText("Common.save")}
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>
    </>
  );
}
export default OrganizationCard;
