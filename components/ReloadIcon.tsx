import React from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/Colors';

const ReloadIcon = ({ load }: {
  load: () => void;
}) => {
  const reloadIconName = Platform.OS === 'ios' ? 'refresh' : 'refresh-circle-outline';
  return (
    <View style={styles.reloadIcon}>
      <Ionicons
        name={reloadIconName}
        size={24}
        color={COLORS.PRIMARY_COLOR}
        onPress={load}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  reloadIcon: {
    position: 'absolute',
    top: 30,
    right: 20,
  },
})

export default ReloadIcon;
