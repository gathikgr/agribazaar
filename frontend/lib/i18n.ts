import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import en from "@/translations/en.json";
import hi from "@/translations/hi.json";
import te from "@/translations/te.json";

if (!i18n.isInitialized) {
  i18n.use(LanguageDetector).use(initReactI18next).init({
    resources: {
      en: { translation: en },
      hi: { translation: hi },
      te: { translation: te }
    },
    fallbackLng: "en",
    interpolation: { escapeValue: false }
  });
}

export default i18n;
