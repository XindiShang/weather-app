import { ScrollView, Text, TouchableOpacity, StyleSheet, View, ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { changeLanguage, getStoredLanguage, weatherLanguageCodes } from '../i18n'
import type { WeatherData, Units } from "@/types/weather";
import WeatherInfo from "@/components/WeatherInfo";
import UnitsPicker from "@/components/UnitsPicker";
import { COLORS } from '@/constants/Colors';

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
  // const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const load = async () => {
    setWeather(null);
    setErrorMessage(null);
    try {
      // setLoading(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMessage("Access to location is needed to run the app");
        // setLoading(false);
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
    // finally {
    //   setLoading(false);
    // }
  }

  const handleChangeLanguage = async (lang: string) => {
    await changeLanguage(lang);
    setCurrentLanguage(lang);
  }

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const savedLanguage = await getStoredLanguage();
        await changeLanguage(savedLanguage);
        setCurrentLanguage(savedLanguage);
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
  }, [currentLanguage, units]);

  return (
    <View
      style={styles.container}
    >
      <StatusBar style="auto" />

      {weather ? (
        <>
          <UnitsPicker units={units} setUnits={setUnits} />
          <WeatherInfo weather={weather!} />
        </>
      ) : errorMessage ? (
        <Text>{errorMessage || t('loading')}</Text>
      ) : (
        <ActivityIndicator size="large" color={COLORS.PRIMARY_COLOR} />
      )}

      <Text>{t('language')}: </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {flags.map(({ lang, name }) => (
          <TouchableOpacity
            key={name}
            onPress={async () => handleChangeLanguage(lang)}
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
});