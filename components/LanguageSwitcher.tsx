import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { COLORS } from '@/constants/Colors';

const flags = [
  { lang: "en-US", name: "English" },
  { lang: "zh-CN", name: "中文" },
];

const { PRIMARY_COLOR, SECONDARY_COLOR } = COLORS;

export default function LanguageSwitcher({ handleChangeLanguage }: {
  handleChangeLanguage: (lang: string) => void;
}
) {
  const { i18n, t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{ t('language.select')}:</Text>
      {flags.map(({ lang, name }) => (
        <TouchableOpacity
          key={lang}
          onPress={async () => handleChangeLanguage(lang)}
          style={[
            styles.button,
            i18n.language === lang && styles.selectedButton
          ]}
        >
          <Text style={{
            color: i18n.language === lang ? 'white' : PRIMARY_COLOR,
          }}>{name}</Text>
        </TouchableOpacity>
      ))}
    </View>
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
    borderColor: '#ccc',
    borderRadius: 5,
  },
  selectedButton: {
    backgroundColor: PRIMARY_COLOR,
    borderColor: PRIMARY_COLOR,
    color: 'white',
  },
});