import React from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';
import type { WeatherData, Units } from '@/types/weather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { UNITS } from '@/constants';
import { formatWindSpeed } from '@/utils';
import { useTranslation } from 'react-i18next';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';

const WeatherDetails = ({ weather, units }: {
  weather: WeatherData,
  units: Units,
}) => {
  const { t } = useTranslation();
  const theme = useColorScheme() ?? 'light';

  const {
    main: { feels_like, humidity, pressure },
    wind: { speed },
  } = weather;
  return (
    <ThemedView style={{ ...styles.weatherDetails, borderColor: Colors[theme].border }}>
      <ThemedView style={{ ...styles.weatherDetailsRow, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
        <ThemedView style={{ ...styles.weatherDetailsBox, borderTopLeftRadius: 10, borderRightWidth: 1, borderRightColor: Colors[theme].border }}>
          <ThemedView style={styles.weatherDetailsRow}>
            <FontAwesome5 name="temperature-low" size={25} color={Colors[theme].primary} />
            <ThemedView style={styles.weatherDetailsItems}>
              <ThemedText style={{ ...styles.textPrimary, color: Colors[theme].primary }}>{t('weather.feelsLike')}:</ThemedText>
              <ThemedText style={{ ...styles.textSecondary, color: Colors[theme].secondary }}>{feels_like} {UNITS[units]}</ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>

        <ThemedView style={{ ...styles.weatherDetailsBox, borderTopRightRadius: 10 }}>
          <ThemedView style={styles.weatherDetailsRow}>
            <MaterialCommunityIcons name="water" size={30} color={Colors[theme].primary} />
            <ThemedView style={styles.weatherDetailsItems}>
              <ThemedText style={{ ...styles.textPrimary, color: Colors[theme].primary }}>{t('weather.humidity')}:</ThemedText>
              <ThemedText style={{ ...styles.textSecondary, color: Colors[theme].secondary }}>{humidity}</ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </ThemedView>

      <ThemedView style={{ ...styles.weatherDetailsRow, borderTopWidth: 1, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, borderTopColor: Colors[theme].border }}>
        <ThemedView style={{ ...styles.weatherDetailsBox, borderRightWidth: 1, borderBottomLeftRadius: 10, borderRightColor: Colors[theme].border }}>
          <ThemedView style={styles.weatherDetailsRow}>
            <MaterialCommunityIcons name="weather-windy" size={25} color={Colors[theme].primary} />
            <ThemedView style={styles.weatherDetailsItems}>
              <ThemedText style={{ ...styles.textPrimary, color: Colors[theme].primary }}>{t('weather.windSpeed')}:</ThemedText>
              <ThemedText style={{ ...styles.textSecondary, color: Colors[theme].secondary }}>{formatWindSpeed(speed, units)}</ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>

        <ThemedView style={{ ...styles.weatherDetailsBox, borderBottomRightRadius: 10 }}>
          <ThemedView style={styles.weatherDetailsRow}>
            <MaterialCommunityIcons name="speedometer" size={30} color={Colors[theme].primary} />
            <ThemedView style={styles.weatherDetailsItems}>
              <ThemedText style={{ ...styles.textPrimary, color: Colors[theme].primary }}>{t('weather.pressure')}:</ThemedText>
              <ThemedText style={{ ...styles.textSecondary, color: Colors[theme].secondary }}>{pressure} hPa</ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  weatherDetails: {
    marginTop: 'auto',
    margin: 15,
    borderWidth: 1,
    borderRadius: 10,
    width: '90%',
  },
  weatherDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  weatherDetailsBox: {
    flex: 1,
    padding: 20,
  },
  weatherDetailsItems: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  textSecondary: {
    fontSize: 15,
    fontWeight: '700',
    margin: 7,
  },
  textPrimary: {
    fontSize: 20,
    fontWeight: '700',
  },
})

export default WeatherDetails;
