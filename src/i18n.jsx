import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import thTranslation from "./assets/locales/th/translation.json";
import enSGTranslation from "./assets/locales/en-SG/translation.json";
import viTranslation from "./assets/locales/vi/translation.json";
import idTranslation from "./assets/locales/id/translation.json";
import cnTranslation from "./assets/locales/cn/translation.json";
import msTranslation from "./assets/locales/ms/translation.json";
import filTranslation from "./assets/locales/fil/translation.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      th: { translation: thTranslation },
      en: { translation: enSGTranslation },
      "en-SG": { translation: enSGTranslation },
      fil: { translation: filTranslation },
      vi: { translation: viTranslation },
      id: { translation: idTranslation },
      cn: { translation: cnTranslation },
      ms: { translation: msTranslation },
    },
    fallbackLng: "th",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
