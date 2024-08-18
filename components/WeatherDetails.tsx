import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { COLORS } from '@/constants/Colors';
import type { WeatherData, Units } from '@/types/weather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { UNITS } from '@/constants';
import { formatWindSpeed } from '@/utils';
import { useTranslation } from 'react-i18next';

const { PRIMARY_COLOR, SECONDARY_COLOR, BORDER_COLOR } = COLORS;

const WeatherDetails = ({ weather, units }: {
  weather: WeatherData,
  units: Units,
}) => {
  const { t } = useTranslation();
  const {
    main: { feels_like, humidity, pressure },
    wind: { speed },
  } = weather;
  return (
    <View style={styles.weatherDetails}>
      <View style={styles.weatherDetailsRow}>
        <View style={{ ...styles.weatherDetailsBox, borderRightWidth: 1, borderRightColor: BORDER_COLOR }}>
          <View style={styles.weatherDetailsRow}>
            <FontAwesome5 name="temperature-low" size={25} color={PRIMARY_COLOR} />
            <View style={styles.weatherDetailsItems}>
              <Text style={styles.textPrimary}>{t('weather.feelsLike')}:</Text>
              <Text style={styles.textSecondary}>{feels_like} {UNITS[units]}</Text>
            </View>
          </View>
        </View>

        <View style={styles.weatherDetailsBox}>
          <View style={styles.weatherDetailsRow}>
            <MaterialCommunityIcons name="water" size={30} color={PRIMARY_COLOR} />
            <View style={styles.weatherDetailsItems}>
              <Text style={styles.textPrimary}>{t('weather.humidity')}:</Text>
              <Text style={styles.textSecondary}>{humidity}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={{ ...styles.weatherDetailsRow, borderTopWidth: 1, borderTopColor: BORDER_COLOR }}>
        <View style={{ ...styles.weatherDetailsBox, borderRightWidth: 1, borderRightColor: BORDER_COLOR }}>
          <View style={styles.weatherDetailsRow}>
            <MaterialCommunityIcons name="weather-windy" size={25} color={PRIMARY_COLOR} />
            <View style={styles.weatherDetailsItems}>
              <Text style={styles.textPrimary}>{t('weather.windSpeed')}:</Text>
              <Text style={styles.textSecondary}>{formatWindSpeed(speed, units)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.weatherDetailsBox}>
          <View style={styles.weatherDetailsRow}>
            <MaterialCommunityIcons name="speedometer" size={30} color={PRIMARY_COLOR} />
            <View style={styles.weatherDetailsItems}>
              <Text style={styles.textPrimary}>{t('weather.pressure')}:</Text>
              <Text style={styles.textSecondary}>{pressure} hPa</Text>
            </View>
          </View>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  weatherDetails: {
    marginTop: 'auto',
    margin: 15,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
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
    color: SECONDARY_COLOR,
    fontWeight: '700',
    margin: 7,
  },
  textPrimary: {
    fontSize: 20,
    color: PRIMARY_COLOR,
    fontWeight: '700',
  },
})

export default WeatherDetails;
