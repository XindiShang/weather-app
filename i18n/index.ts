import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import * as SecureStore from "expo-secure-store";
import { Platform } from 'react-native';
import translationEn from "./locales/en-US/translation.json";
import translationZh from "./locales/zh-CN/translation.json";

const resources = {
  "en-US": { translation: translationEn },
  "zh-CN": { translation: translationZh },
};

export const weatherLanguageCodes = {
  "en-US": "en",
  "zh-CN": "zh_cn",
  "zh-Hans-CN": "zh_cn",
};

const initI18n = async () => {
  const language = await getStoredLanguage();

  i18n.use(initReactI18next).init({
    compatibilityJSON: "v3",
    resources,
    lng: language,
    fallbackLng: "zh-CN",
    interpolation: {
      escapeValue: false,
    },
  });
};

export const getStoredLanguage = async () => {
  try {
    if (Platform.OS === 'web') {
      const savedLanguage = localStorage.getItem('language');
      return savedLanguage || Localization.locale;
    } else {
      const savedLanguage = await SecureStore.getItemAsync('language');
      return savedLanguage || Localization.locale;
    }
  } catch (error) {
    console.error('Failed to load language:', error);
    return Localization.locale;
  }
};

export const changeLanguage = async (lang: string) => {
  try {
    if (Platform.OS === 'web') {
      localStorage.setItem('language', lang);
    } else {
      await SecureStore.setItemAsync('language', lang);
    }
    i18n.changeLanguage(lang);
  } catch (error) {
    console.error('Failed to change language:', error);
  }
};


initI18n();

export default i18n;