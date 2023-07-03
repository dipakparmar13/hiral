import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import {
  Catalogue,
  Contact,
  Layout,
  LoginForm,
  Message,
  ReadMore,
  Setting,
} from "../pages/index";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const MainRouter = () => {
  const { i18n } = useTranslation();
  const { language } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );

  useEffect(() => {
    localStorage.getItem("token") == null && navigate("/login");
    i18n.changeLanguage(language);
  }, [navigate, i18n, language]);

  return (
    <>
      {localStorage.getItem("token") === null ? (
        <Routes>
          <Route
            path="/login"
            element={
              <LoginForm
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
            }
          />
          <Route path="*" element={<Navigate to={"/login"} />} />
        </Routes>
      ) : (
        <Routes>
          <Route
            path="/catalogue"
            element={
              <Catalogue
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
            }
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/orders" element={<Layout />} />
          {/* <Route
            path="/login"
            element={
              <LoginForm
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
            }
          /> */}
          <Route path="/order/:id" element={<ReadMore />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/message" element={<Message />} />
          <Route path="*" element={<Navigate to={"/catalogue"} />} />
        </Routes>
      )}
    </>
  );
};
export default MainRouter;
