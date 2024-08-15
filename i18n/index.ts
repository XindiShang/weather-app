import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import translationEn from "./locales/en-US/translation.json";
import translationZh from "./locales/zh-CN/translation.json";

const resources = {
  "en-US": { translation: translationEn },
  "zh-CN": { translation: translationZh },
};

const initI18n = async () => {
  const language = await getStoredLanguage();

  i18n.use(initReactI18next).init({
    compatibilityJSON: "v3",
    resources,
    lng: language,
    fallbackLng: "pt-BR",
    interpolation: {
      escapeValue: false,
    },
  });
};

export const getStoredLanguage = async () => {
  try {
    const savedLanguage = await AsyncStorage.getItem('language');
    return savedLanguage || Localization.locale;
  } catch (error) {
    console.error('Failed to load language from AsyncStorage:', error);
    return Localization.locale;  // 如果获取失败，返回设备的默认语言
  }
};

export const changeLanguage = async (lang: string) => {
  try {
    await AsyncStorage.setItem('language', lang);
    i18n.changeLanguage(lang);
  } catch (error) {
    console.error('Failed to change language:', error);
  }
};


initI18n();

export default i18n;