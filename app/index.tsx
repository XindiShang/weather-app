import LanguageSwitcher from "@/components/LanguageSwitcher";
import ReloadIcon from "@/components/ReloadIcon";
import UnitsPicker from "@/components/UnitsPicker";
import WeatherDetails from "@/components/WeatherDetails";
import WeatherInfo from "@/components/WeatherInfo";
import { COLORS } from '@/constants/Colors';
import type { Units, WeatherData } from "@/types/weather";
import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { changeLanguage, getStoredLanguage, weatherLanguageCodes } from '../i18n';

const flags = [
  { lang: "en-US", name: "USA" },
  { lang: "zh-CN", name: "China" },
];

const WEATHER_API_KEY = 'fc7bf996cf728a31ce9b0aee35faaecc';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export default function Index() {
  const { i18n, t } = useTranslation();

  const currentLanguage = i18n.language;
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [units, setUnits] = useState<Units>("metric");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const load = async () => {
    setWeather(null);
    setErrorMessage(null);
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
      setErrorMessage('Failed to load weather data');
    }
  }

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const savedLanguage = await getStoredLanguage();
        await changeLanguage(savedLanguage);
      } catch (error) {
        console.error("Failed to load language:", error);
      }
    };
    loadLanguage();
  }, []);

  useEffect(() => {
    if (i18n.language) {
      load();
    }
  }, [i18n.language, units]);

  return (
    <View
      style={styles.container}
    >
      <StatusBar style="auto" />

      {weather ? (
        <>
          <View style={styles.main}>
            <UnitsPicker units={units} setUnits={setUnits} />
            <ReloadIcon load={load} />
            <WeatherInfo weather={weather} units={units} />
          </View>

          <LanguageSwitcher handleChangeLanguage={changeLanguage} />

          <WeatherDetails weather={weather} units={units} />
        </>
      ) : errorMessage ? (
        <>
          <ReloadIcon load={load} />
          <Text>{errorMessage || t('loading')}</Text>
        </>
      ) : (
        <ActivityIndicator size="large" color={COLORS.PRIMARY_COLOR} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
});