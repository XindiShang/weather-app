import { Colors } from '@/constants/Colors';
import type { Units, WeatherData } from '@/types/weather';
import { formatTemperature } from '@/utils';
import { Image, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

export default function WeatherInfo({ weather, units }: { weather: WeatherData, units: Units }) {
  const {
    main: { temp },
    weather: [details],
    name,
  } = weather;

  const { icon, main, description } = details;
  const iconUrl = `http://openweathermap.org/img/wn/${icon}@4x.png`;
  return (
    <ThemedView style={styles.weatherInfo}>
      <ThemedText>{name}</ThemedText>
      <Image source={{ uri: iconUrl }} style={styles.weatherIcon} />
      <ThemedText style={styles.textPrimary} lightColor={Colors.light.primary} darkColor={Colors.dark.primary}>{formatTemperature(temp, units)}</ThemedText>
      <ThemedText style={styles.weatherDescription}>{description}</ThemedText>
      <ThemedText style={styles.textSecondary} lightColor={Colors.light.secondary} darkColor={Colors.dark.secondary}>{main}</ThemedText>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  weatherInfo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
  weatherDescription: {
    textTransform: 'capitalize',
    marginTop: 10,
  },
  textPrimary: {
    fontSize: 40,
    lineHeight: 40,
  },
  textSecondary: {
    fontSize: 20,
    fontWeight: '500',
  },
});