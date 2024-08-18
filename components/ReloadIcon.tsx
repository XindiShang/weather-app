import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Platform, StyleSheet, useColorScheme, View } from 'react-native';

const ReloadIcon = ({ load }: {
  load: () => void;
}) => {
  const reloadIconName = Platform.OS === 'ios' ? 'refresh' : 'refresh-circle-outline';
  const theme = useColorScheme() ?? 'light';

  return (
    <View style={styles.reloadIcon}>
      <Ionicons
        name={reloadIconName}
        size={24}
        color={theme === 'light' ? Colors.light.primary : Colors.dark.primary}
        onPress={load}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  reloadIcon: {
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
    right: 20,
    zIndex: 10
  },
})

export default ReloadIcon;
