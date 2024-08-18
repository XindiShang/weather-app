import { Text, View, StyleSheet, Image } from 'react-native';
import type { Units, WeatherData } from '@/types/weather';
import { COLORS } from '@/constants/Colors';
import { formatTemperature } from '@/utils';

const { PRIMARY_COLOR, SECONDARY_COLOR } = COLORS;

export default function WeatherInfo({ weather, units }: { weather: WeatherData, units: Units }) {
  const {
    main: { temp },
    weather: [details],
    name,
  } = weather;

  const { icon, main, description } = details;
  const iconUrl = `http://openweathermap.org/img/wn/${icon}@4x.png`;
  return (
    <View style={styles.weatherInfo}>
      <Text>{name}</Text>
      <Image source={{ uri: iconUrl }} style={styles.weatherIcon} />
      <Text style={styles.textPrimary}>{formatTemperature(temp, units)}</Text>
      <Text style={styles.weatherDescription}>{description}</Text>
      <Text style={styles.textSecondary}>{main}</Text>
    </View>
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
  },
  textPrimary: {
    fontSize: 40,
    color: PRIMARY_COLOR,
  },
  textSecondary: {
    fontSize: 20,
    color: SECONDARY_COLOR,
    fontWeight: '500',
    marginTop: 10,
  },
});