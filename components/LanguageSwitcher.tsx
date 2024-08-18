import { Colors } from '@/constants/Colors';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

const flags = [
  { lang: "en-US", name: "English" },
  { lang: "zh-CN", name: "中文" },
];

export default function LanguageSwitcher({ handleChangeLanguage }: {
  handleChangeLanguage: (lang: string) => void;
}
) {
  const { i18n, t } = useTranslation();

  const theme = useColorScheme() ?? 'light';

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>{t('language.select')}:</ThemedText>
      {flags.map(({ lang, name }) => (
        <TouchableOpacity
          key={lang}
          onPress={async () => handleChangeLanguage(lang)}
          style={[
            styles.button,
            { borderColor: Colors[theme].border },
            i18n.language === lang && theme === 'light' && styles.selectedButtonLight,
            i18n.language === lang && theme === 'dark' && styles.selectedButtonDark,
          ]}
        >
          <ThemedText style={{
            color: i18n.language === lang ? 'white' : Colors[theme].primary,
          }}>{name}</ThemedText>
        </TouchableOpacity>
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  title: {
    fontSize: 16,
    marginRight: 10,
  },
  button: {
    padding: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderRadius: 5,
  },
  selectedButtonLight: {
    backgroundColor: Colors.light.primary,
    borderColor: Colors.light.primary,
    color: 'white',
  },
  selectedButtonDark: {
    backgroundColor: Colors.dark.primary,
    borderColor: Colors.dark.primary,
    color: 'white',
  },
});