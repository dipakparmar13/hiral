import i18n, { t } from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import translationEN from "./en.json";
import translationFR from "./fr.json";

const fallbackLng = ["fr"];
const availableLanguages = ["en", "fr"];

const resources = {
  en: {
    translation: translationEN,
  },
  fr: {
    translation: translationFR,
  },
};

const lng = localStorage.getItem("i18nextLng") || "fr";
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  // .setDefaultNamespace("fr")
  .init({
    resources,
    fallbackLng,
    lng: lng,

    detection: {
      checkWhitelist: true, //true
    },

    debug: false,

    whitelist: availableLanguages,

    interpolation: {
      escapeValue: false,
    },
  });

export const getLocalText = (text) => {
  return t(text);
};

export default i18n;
