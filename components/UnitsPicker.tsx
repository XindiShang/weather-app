import type { Units } from '@/types/weather';
import { Picker } from '@react-native-picker/picker';
import { useTranslation } from 'react-i18next';
import { Platform, StyleSheet, useColorScheme } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { Colors } from '@/constants/Colors';

const UnitsPickerItems: Record<Units, string> = {
  metric: 'C°',
  imperial: 'F°',
  standard: 'K',
}

const UnitsPicker = ({ units, setUnits }: {
  units: Units;
  setUnits: (units: Units) => void;
}) => {
  const { t } = useTranslation();
  const theme = useColorScheme() ?? 'light';

  return (
    <ThemedView style={styles.container}>
      <ThemedText>{t('weather.chooseUnits')}:</ThemedText>
      <Picker
        selectedValue={units}
        onValueChange={(itemValue) => {
          setUnits(itemValue);
        }}
        style={styles.picker}
        mode='dropdown'
        itemStyle={{ fontSize: 12 }}
      >
        {
          Object.entries(UnitsPickerItems).map(([key, value]) => (
            <Picker.Item key={key} label={value} value={key} color={Colors[theme].text} />
          ))
        }
      </Picker>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    ...Platform.select({
      ios: {
        top: 60,
      },
      android: {
        top: 60,
      },
      web: {
        top: 30,
      },
    }),
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
