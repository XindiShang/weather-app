import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { changeLanguage, getStoredLanguage, weatherLanguageCodes } from '../i18n'
import type { WeatherData, Units } from "@/types/weather";
import WeatherInfo from "@/components/WeatherInfo";

const flags = [
  { lang: "en-US", name: "USA" },
  { lang: "zh-CN", name: "China" },
];

const WEATHER_API_KEY = 'fc7bf996cf728a31ce9b0aee35faaecc';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export default function Index() {
  const { i18n, t } = useTranslation();

  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [units, setUnits] = useState<Units>("metric");
  const [errorMessage, setErrorMessage] = useState("");

  const load = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMessage("Access to location is needed to run the app");
        return;
      }
      const location = await Location.getCurrentPositionAsync({});

      const { latitude, longitude } = location.coords;

      const weatherLanguageCode = weatherLanguageCodes[currentLanguage as keyof typeof weatherLanguageCodes];

      const weatherUrl = `${BASE_URL}?lat=${latitude}&lon=${longitude}&units=${units}&appid=${WEATHER_API_KEY}&lang=${weatherLanguageCode}`;

      const response = await fetch(weatherUrl);
      const result = await response.json();

      if (response.ok) {
        setWeather(result as WeatherData);
      } else {
        setErrorMessage(result.message);
      }

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const savedLanguage = await getStoredLanguage();
        await changeLanguage(savedLanguage);
        setCurrentLanguage(i18n.language);
      } catch (error) {
        console.error("Failed to load language:", error);
      }
    };
    loadLanguage();
  }, []);

  useEffect(() => {
    if (currentLanguage) {
      load();
    }
  }, [currentLanguage]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      {weather ? (
        <>
          <WeatherInfo weather={weather} />
        </>
      ) : (
        <Text>{errorMessage || t('loading')}</Text>
      )}
      <Text>{t('language')}: </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {flags.map(({ lang, name }) => (
          <TouchableOpacity
            key={name}
            onPress={async () => await changeLanguage(lang)}
            style={{
              padding: 10,
              borderBottomWidth: 2,
              borderBottomColor: lang === currentLanguage ? "blue" : "transparent",
            }}
          >
            <Text>{name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}
