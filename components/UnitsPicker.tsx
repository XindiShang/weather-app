import React from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import type { Units } from '@/types/weather';
import { useTranslation } from 'react-i18next';

const UnitsPicker = ({ units, setUnits }: {
  units: Units;
  setUnits: (units: Units) => void;
}) => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Text>{t('weather.chooseUnits')}:</Text>
      <Picker
        selectedValue={units}
        onValueChange={(itemValue) => {
          setUnits(itemValue);
        }}
        style={styles.picker}
        mode='dropdown'
        itemStyle={{ fontSize: 12 }}
      >
        <Picker.Item label="C°" value="metric" />
        <Picker.Item label="F°" value="imperial" />
        <Picker.Item label="K" value="standard" />
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    // ...Platform.select({
    //   ios: {
    //     top: 30,
    //   },
    //   android: {
    //     top: 30,
    //   },
    //   web: {
    //     top: 30,
    //   },
    // }),
    top: 30,
    left: 20,
    height: 50,
    width: 100,
    zIndex: 10,
  },
  picker: {
    width: 100,
    height: 50,
    marginTop: Platform.OS === 'ios' ? -30 : 10,
  }
})

export default UnitsPicker;
