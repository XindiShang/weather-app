import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { changeLanguage, getStoredLanguage } from '../i18n'

const flags = [
  { lang: "en-US", name: "USA" },
  { lang: "zh-CN", name: "China" },
];

const WEATHER_API_KEY='fc7bf996cf728a31ce9b0aee35faaecc';

export default function Index() {
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language;

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const savedLanguage = await getStoredLanguage();
        changeLanguage(savedLanguage);
      } catch (error) {
        console.error("Failed to load language:", error);
      }
    };
    loadLanguage();
  }, [i18n]);

  const [errorMessage, setErrorMessage] = useState("");
  
  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMessage("Access to location is needed to run the app");
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      
      const { latitude, longitude } = location.coords;
      const message = `${t('geo.latitude')}: ${latitude}, ${t('geo.longitude')}: ${longitude}`;

      alert(message);
    } catch (error) {
    }
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>{t('language')}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {flags.map(({ lang, name }) => (
          <TouchableOpacity
            key={name}
            onPress={() => changeLanguage(lang)}
          >
            <Text>{name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}
