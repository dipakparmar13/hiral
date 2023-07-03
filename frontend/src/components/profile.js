import { React, useEffect, useRef, useState } from "react";
import { Row, Col, Card, Form, Image, Button } from "react-bootstrap";
import { BsUpload } from "react-icons/bs";
import Select from "react-select";
import { getLocalText } from "../localate/i18nextInit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastMessage from "./toast";
import { validateProfile } from "./validation";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, languageSet } from "../redux/action/authaction";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import { config } from "../redux/header";

const options = [
  { value: "en", label: "English " },
  { value: "fr", label: "French" },
];

function Profile() {
  const dispatch = useDispatch();
  const { userList} = useSelector((state) => state.auth);
  const [errors, setErrors] = useState({});
  const [imgs, setImgs] = useState("");
  const [edit, setEdit] = useState(false);
  const hiddenFileInput = useRef(null);
  const [inpval, setInpval] = useState("");
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  useEffect(() => {
    setInpval(userList?.user);
    setImgs(userList?.user?.profile_image ? `${process.env.REACT_APP_PUBLIC_URL}/auth/get/${userList?.user?.profile_image}` : '');
  }, [userList?.user]);

  const handleChange = (name, value) => {
    const fileUploaded = value[0];
    if (value.length !== 0) {
      const objectUrl = URL.createObjectURL(fileUploaded);
      setImgs(objectUrl);
      setErrors({ ...errors, [name]: null });
      setInpval({ ...inpval, [name]: value });
      setEdit(true);
    }
  };
  const getdata = (e) => {
    setInpval({ ...inpval, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null });
    setEdit(true);
  };
  const handleProfile = async () => {
    let formErrors = validateProfile(inpval);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    }
    else if (
      userList?.user?._id &&
      JSON.stringify(inpval) !== JSON.stringify(userList?.user) &&
      Object.keys(formErrors).length < 1
    ) {
      var formData = new FormData();
      formData.append("first_name", inpval?.first_name);
      formData.append("last_name", inpval?.last_name);
      formData.append("number", inpval?.number);
      formData.append("profile_image", inpval?.company_logo[0]);
      try {
        await axios.patch(
          `${process.env.REACT_APP_PUBLIC_URL}/auth/user/update`,
          formData,
          config()
        );
        dispatch(getUserData());
        toast(<ToastMessage />);
      } catch (error) {
        console.log("error", error);
      }
    }
  }
  const selectlanguage = (e) => {
    dispatch(languageSet(e.value));
  };
  const phoneValidation = (e) => {
    setInpval({ ...inpval, number: e });
    const valid = /^[0-9]{10}$/;
    if (!valid.test(e)) {
      setErrors({
        ...errors,
        [e]: (errors.number = getLocalText(
          "InvitationModal.Validation.phoneNumber"
        )),
      });
      setEdit(true)
    } else {
      setErrors({ ...errors, number: null });
      setEdit(false)
    }
  };
  return (
    <>
      <Card className="mb-10">
        <Card.Body>
          <div className="position-relative">
            <div className="hstack gap-4 flex-wrap flex-sm-nowrap">
              {imgs ? (
                <Image
                  src={imgs}
                  className="rounded-circle"
                  style={{ width: "48px", height: "48px" }}
                />
              ) : (
                <span className="avatar avatar-lg bg-secondary rounded-circle"></span>
              )}
              <div>
                <h5 className="font-bold text-black">
                  {getLocalText("Profile.heather")}
                </h5>
                <p className="text-corn-blue text-roboto">
                  {getLocalText("Profile.pngOrJpg")}
                </p>
              </div>
              <button
                onClick={handleClick}
                className="text-sm font-bold ms-sm-auto d-flex btn-upload"
              >
                <BsUpload className="text-lg me-2" />
                {getLocalText("Profile.download")}
              </button>
              <input
                accept="image/*"
                type="file"
                name="company_logo"
                ref={hiddenFileInput}
                onChange={(e) => handleChange("company_logo", e.target.files)}
                style={{ display: "none" }}
              />
            </div>
            <p className="text-danger">{errors.company_logo}</p>
          </div>
        </Card.Body>
      </Card>
      <h5 className="font-bold mb-6">
        {getLocalText("Profile.accountInformation")}
      </h5>
      <Row className="gy-5 mb-10 mb-lg-20">
        <Col md={6}>
          <Form.Group>
            <Form.Label className="text-corn-blue">
              {getLocalText("Profile.firstName")}
            </Form.Label>
            <Form.Control
              value={inpval?.first_name ? inpval?.first_name : ""}
              type="text"
              name="first_name"
              placeholder={getLocalText("Profile.Validation.firstName")}
              onChange={(e) => getdata(e)}
              className="text-roboto py-2"
            />
          </Form.Group>
          <p className="text-danger">{errors.first_name}</p>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label className="text-corn-blue">
              {getLocalText("Profile.surname")}
            </Form.Label>
            <Form.Control
              value={inpval?.last_name ? inpval?.last_name : ""}
              type="text"
              name="last_name"
              placeholder={getLocalText("Profile.Validation.last_name")}
              onChange={(e) => getdata(e)}
              className="text-roboto py-2"
            />
          </Form.Group>
          <p className="text-danger">{errors.last_name}</p>
        </Col>
        <Col md={6}>
          <Form.Group className=" country-select  rounded-2 text-roboto">
            <Form.Label className="text-corn-blue">
              {getLocalText("Common.phoneNumber")}
            </Form.Label>
            <PhoneInput
              className="shadow-none rounded-2 "
              containerClass="input-group"
              country={"ca"}
              inputClass="form-control-lg rounded-2 ps-16 pe-0 border-0 "
              buttonClass="start-2 top-2 bottom-2 border-0 overlap-10  rounded-5"
              value={inpval?.number ? inpval?.number : ""}
              dropdownClass="shadow-2 rounded-2"
              placeholder={getLocalText("LoginForm.placeHolder")}
              onChange={(e) => {
                phoneValidation(e);
              }}
            />
          </Form.Group>
          <p className="text-danger">{errors.number}</p>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label className="text-corn-blue">
              {getLocalText("Profile.language")}
            </Form.Label>
            <Select
              name="language"
              options={options}
              defaultValue={
                localStorage.getItem("i18nextLng") === "en"
                  ? { value: "en", label: "English" }
                  : { value: "fr", label: "French" }
              }
              onChange={selectlanguage}
              placeholder={"Placeholder"}
              className="mb-10 text-roboto"
              styles={{
                option: (base) => ({
                  ...base,
                  border: `1px dotted transparent`,
                  borderRadius: "6px",
                  height: "38px",
                  width: "calc(100% - 24px)",
                  margin: "6px 12px ",
                }),
              }}
              theme={(theme) => ({
                ...theme,
                borderRadius: 0,
                colors: {
                  ...theme.colors,
                  primary: "#4C6FFF",
                },
              })}
            />
            <p className="text-danger" style={{ marginTop: "-35px" }}>
              {errors.language}
            </p>
          </Form.Group>
        </Col>
      </Row>
      {edit && <Button
        variant="primary"
        onClick={() => handleProfile()}
        className="w-max ms-auto d-flex text-sm mb-5"
      >
        {getLocalText("Common.saveChanges")}
      </Button>}
    </>
  );
}
export default Profile;
